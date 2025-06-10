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

  const fetchApplications = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    try {
      const response = await apiClient.get('recipient-applications', {
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

  return (
    <div>
      {/* Header */}
      <BackHeader to={-1} label="Prapa" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="py-6 text-center text-2xl font-bold">Aplikimet e pranuara</h2>

        {applications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-center text-gray-600 text-lg">Nuk ke asnjë aplikim të pranuar!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{app.foodListing?.name}</h3>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Dhuruesi:</span> {app.foodListing?.donor?.business_name}</p>
                    <p><span className="font-medium text-gray-700">Adresa:</span> {app.foodListing?.donor?.address}, {app.foodListing?.donor?.city.name}</p>
                    <p><span className="font-medium text-gray-700">Aplikuar më:</span> {formatDate(app.created_at)}</p>
                  </div>

                  {app.status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-sm mt-4">
                      Aplikimi juaj është pranuar, kontakto me dhuruesin për të diskutuar detajet e mëtejme.
                    </div>
                  )}

                  <div className="text-sm text-gray-600 space-y-1 mt-4">
                    <p><span className="font-medium text-gray-700">Email i dhuruesit:</span> {app.foodListing?.user?.email}</p>
                    <p><span className="font-medium text-gray-700">Nr. kontaktues i personit përgjegjës:</span> {app.foodListing?.donor?.contact_phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

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