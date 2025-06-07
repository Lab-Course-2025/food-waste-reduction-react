import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { toast } from 'react-hot-toast';
import { apiClient } from '../utils/apiClient';
import BackHeader from '../components/BackHeader';

const DonorApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionType, setActionType] = useState(""); // "accept" or "reject"
  const [showModal, setShowModal] = useState(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'pending': return 'Në pritje';
      case 'accepted': return 'Pranuar';
      case 'rejected': return 'Refuzuar';
      default: return status;
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await apiClient.get('donor-applications', {
        params: {
          status: 'pending',
          page: currentPage,
          limit: 10,
        },
      });
      setApplications(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error("Error fetching donor applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const handleConfirmAction = async () => {
    if (!selectedApplication) return;

    try {
      // Update the application status
      await apiClient.patch(`/applications/${selectedApplication.id}`, {
        status: actionType === "accepted" ? "accepted" : "rejected",
      });

      // Close modal and reset state
      setShowModal(false);
      setSelectedApplication(null);
      setActionType("");

      // Re-fetch applications to reflect the updated status
      await fetchApplications();

      // Show success toast
      toast.success(`Aplikimi u ${actionType === "accepted" ? "pranua" : "refuzua"} me sukses!`);
    } catch (error) {
      console.error(`Failed to ${actionType} application`, error);
      toast.error('Ndodhi një gabim!');
    }
  };


  return (
    <div>
      {/* Header */}
      <BackHeader to={-1} label="Prapa" />


      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="py-6 text-center text-2xl font-bold">Aplikimet për postimet e mia</h2>
        {applications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-center text-gray-600 text-lg">
              Nuk ka asnjë aplikim në pritje për postimet tuaja!
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
                  <p className="text-sm text-gray-500">Aplikuesi: {app.recipient?.organization_name}</p>
                  <p className="text-sm text-gray-500">Adresa e aplikuesit: {app.recipient?.address} , {app.recipient?.city.name}</p>
                  <p className="text-sm text-gray-500">Aplikuar me: {formatDate(app.created_at)}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${app.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : app.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {formatStatus(app.status)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {app.status === 'pending' && (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedApplication(app);
                          setActionType("accepted");
                          setShowModal(true);
                        }}
                      >
                        Prano
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedApplication(app);
                          setActionType("rejected");
                          setShowModal(true);
                        }}
                      >
                        Refuzo
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
              A doni të {actionType === "accepted" ? "pranoni" : "refuzoni"} aplikimin nga <strong>{selectedApplication.recipient?.organization_name}</strong>?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                className="bg-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Anulo
              </Button>
              <Button
                className={`px-4 py-2 rounded text-white transition duration-200 ${actionType === "accepted"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
                  }`}
                onClick={handleConfirmAction}
              >
                Po, {actionType === "accepted" ? "prano" : "refuzo"}
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

export default DonorApplications;