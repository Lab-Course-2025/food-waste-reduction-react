import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { toast } from 'react-hot-toast';
import { apiClient } from '../utils/apiClient';
import BackHeader from '../components/BackHeader';

const DonorAcceptedApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionType, setActionType] = useState(""); // "completed" or "failed"
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'pending': return 'Në pritje';
      case 'accepted': return 'Pranuar';
      case 'rejected': return 'Refuzuar';
      case 'completed': return 'Përfunduar';
      case 'failed': return 'Dështoi';
      default: return status;
    }
  };

  // Refactored fetchApplications function
  const fetchApplications = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    try {
      const response = await apiClient.get('donor-applications', {
        params: {
          status: 'accepted',
          page: currentPage,
          limit: 10,
        },
      });
      setApplications(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchApplications(); // Fetch applications on component mount or currentPage change
  }, [currentPage]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const handleConfirmAction = async () => {
    if (!selectedApplication) return;
    setIsProcessing(true);

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    try {
      // Update the application status
      await apiClient.patch(`${apiUrl}/applications/${selectedApplication.id}`, {
        status: actionType === "completed" ? "completed" : "failed",
      });

      // Re-fetch applications to reflect the updated status
      await fetchApplications();

      // Close modal and reset state
      setShowModal(false);
      setSelectedApplication(null);
      setActionType("");
      if (actionType === 'failed') {
        toast.success("Aplikimi u dërgua si 'dështuar'.");
      } else {
        toast.success("Aplikimi u kompletua me sukses!");

      }
    } catch (error) {
      toast.error('Ndodhi nje gabim!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <BackHeader to={-1} label="Prapa" />


      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="py-6 text-center text-2xl font-bold">Aplikimet e pranuara</h2>
        {applications.length === 0 ? (
          <div className="flex items-center justify-center h-64 w-full">
            <p className="text-gray-600 text-lg text-center">
              Nuk ka asnjë aplikim të pranuar!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold">{app.foodListing?.name}</h2>
                  <p className="text-sm text-gray-500">
                    Aplikuesi: {app.recipient?.organization_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Adresa e aplikuesit: {app.recipient?.address} , {app.recipient?.city.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Aplikuar me: {formatDate(app.created_at)}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${app.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : app.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : app.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : ''
                      }`}
                  >
                    {formatStatus(app.status)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {app.status === 'accepted' && (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedApplication(app);
                          setActionType("completed");
                          setShowModal(true);
                        }}
                      >
                        U dorëzua
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedApplication(app);
                          setActionType("failed");
                          setShowModal(true);
                        }}
                      >
                        Dështoi
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Confirmation Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Jeni të sigurt?</h2>
            <p>
              A doni ta shënoni aplikimin nga <strong>{selectedApplication.recipient?.organization_name}</strong> si{" "}
              {actionType === "completed" ? "të kompletuar" : "dështuar"}?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                className="bg-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Anulo
              </Button>
              <Button
                className={`px-4 py-2 rounded text-white transition duration-200 ${actionType === "completed"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
                  } ${isProcessing ? 'pointer-events-none' : ''}`}
                onClick={handleConfirmAction}
                disabled={isProcessing}
              >
                {isProcessing
                  ? `Duke shënuar si ${actionType === "completed" ? "të kompletuar..." : "dështim..."}`
                  : `Po, shënoje si ${actionType === "completed" ? "të kompletuar" : "dështim"}`
                }
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    </div>
  );
};

export default DonorAcceptedApplications;