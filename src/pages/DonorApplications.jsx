import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Button from "../components/Button";

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
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(`${apiUrl}/donor-applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
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

    fetchApplications();
  }, [currentPage]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const handleConfirmAction = async () => {
    if (!selectedApplication) return;

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    try {
      await axios.put(`${apiUrl}/donor-applications/${selectedApplication.id}/status`, {
        status: actionType === "accept" ? "accepted" : "rejected",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApplication.id ? { ...app, status: actionType === "accept" ? "accepted" : "rejected" } : app
        )
      );

      setShowModal(false);
      setSelectedApplication(null);
      setActionType("");
    } catch (error) {
      console.error(`Failed to ${actionType} application`, error);
    }
  };



  return (
    <div>
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span className="text-base font-medium">Prapa</span>
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="py-6 text-center text-2xl font-bold">Aplikimet për postimet e mia</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">Nuk ka asnjë aplikim për postimet tuaja</p>
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
                  <p className="text-sm text-gray-500">Adresa: {app.recipient?.address} , {app.recipient?.city.name}</p>
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
                  <div className="flex space-x-2">
                    {app.status === 'pending' && (
                      <>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                          onClick={() => {
                            setSelectedApplication(app);
                            setActionType("accept");
                            setShowModal(true);
                          }}
                        >
                          Prano
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                          onClick={() => {
                            setSelectedApplication(app);
                            setActionType("reject");
                            setShowModal(true);
                          }}
                        >
                          Refuzo
                        </button>
                      </>
                    )}

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {showModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Jeni të sigurt?</h2>
            <p>
              A doni të {actionType === "accept" ? "pranoni" : "refuzoni"} aplikimin nga <strong>{selectedApplication.recipient?.organization_name}</strong>?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Anulo
              </Button>
              <Button
                className={`px-4 py-2 rounded text-white ${actionType === "accept" ? "bg-green-500" : "bg-red-500"}`}
                onClick={() => handleConfirmAction()}
              >
                Po, {actionType === "accept" ? "prano" : "refuzo"}
              </Button>
            </div>
          </div>
        </div>
      )}


      {/* Pagination Section */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DonorApplications;
