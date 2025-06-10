import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import Pagination from "../components/Pagination";
import { apiClient } from '../utils/apiClient';
import BackHeader from '../components/BackHeader';

const RecipientApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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


  useEffect(() => {
    const fetchApplications = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await apiClient.get(`${apiUrl}/recipient-applications`, {
          params: {
            status: 'pending',
            page: currentPage,
            limit: 10,
          },
        });
        setApplications(response.data.data);
        setTotalPages(response.data.meta.last_page);
        // setLoading(false);
      } catch (error) {
        // setLoading(false);
      }
    };

    fetchApplications();
  }, [currentPage]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div>
      <BackHeader to={-1} label="Prapa" />


      <div className="max-w-4xl mx-auto p-6">

        <h2 className="py-6 text-center text-2xl font-bold">Aplikimet e mia</h2>
        {applications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600 text-lg text-center">Nuk ke asnjë aplikim në pritje!</p>
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
                  <p className="text-sm text-gray-500">Donatori: {app.foodListing?.donor.business_name}</p>
                  <p className="text-sm text-gray-500">Adresa: {app.foodListing?.address}, {app.foodListing?.city.name}</p>
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

export default RecipientApplications;
