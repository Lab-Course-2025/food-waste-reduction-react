import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import axios from "axios";
import Pagination from "../components/Pagination";

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
        const response = await axios.get(`${apiUrl}/recipient-applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            limit: 10,
          },
        });
        setApplications(response.data.data);
        console.log(response.data);
        setTotalPages(response.data.meta.last_page);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
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

        <h2 className="py-6 text-center text-2xl font-bold">Aplikimet e mia</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">Nuk ke asnje aplikim</p>
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
                <button
                  onClick={() => handleDelete(app.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full ml-4 text-sm cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Pagination Section */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>

  );
};

export default RecipientApplications;
