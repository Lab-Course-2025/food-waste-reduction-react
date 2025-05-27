import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import { apiClient } from '../utils/apiClient';
import BackHeader from "../components/BackHeader";

export default function ActiveDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [userApplications, setUserApplications] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLoginModal(false);
      }
    };

    if (showLoginModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginModal]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDonateClick = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleConfirmApply = async () => {
    setIsApplying(true);
    try {
      const response = await apiClient.post('/applications', {
        food_listing: selectedDonation.id
      });

      const newApplication = {
        id: response.data.id,
        foodListing: { id: selectedDonation.id } // Use selectedDonation.id
      };

      setUserApplications(prev => [newApplication, ...prev]);

      toast.success("Aplikimi u krye me sukses!");
      handleCloseModal();
    } catch (error) {
      console.error("Ndodhi një gabim gjatë aplikimit", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };



  useEffect(() => {
    const fetchCities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/cities`);
        setCities(response.data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchUserApplications = async () => {
      try {
        const response = await apiClient.get('/recipient-applications');
        setUserApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchCities();
    if (isAuthenticated()) {
      fetchUserApplications();
    }
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await apiClient.get('/food-listings', {
          params: {
            statuses: ['active', 'in-wait'],
            page: currentPage,  // Send the current page to the API
            limit: 9,           // Limit the number of items per page (can be dynamic)
            city: selectedCity || undefined, // only send if selected
          },
        });
        // Update donations and pagination data
        setDonations(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [currentPage, selectedCity]);

  return (
    <div>
      <BackHeader to={-1} label="Prapa" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <div className="rounded-lg bg-white overflow-hidden">
          <h2 className="py-6 text-center text-2xl font-bold">Donacionet aktive</h2>
          <div className="px-4 pb-10">
            <div className="mb-6">
              <label htmlFor="cityFilter" className="block mb-2 text-sm font-medium text-gray-700">
                Filtro sipas qytetit:
              </label>
              <select
                id="cityFilter"
                className="w-full max-w-sm border rounded px-3 py-2"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Të gjitha qytetet</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {!loading && donations.length === 0 ? (
                <div className="col-span-full flex items-center justify-center h-64">
                  <p className="text-center text-gray-600 text-lg">Nuk ke asnjë donacion aktiv</p>
                </div>
              ) : (
                donations.map((donation) => {
                  const hasApplied = userApplications.some(
                    (application) => application.foodListing.id === donation.id
                  );

                  return (
                    <Link
                      to={`/donations/${donation.id}`}
                      key={donation.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-[250px] w-full">
                        <img
                          src={
                            donation.image_url ||
                            "https://finegrocery.in/wp-content/uploads/2021/05/finegrocery-place-holder-2.jpg"
                          }
                          alt={donation.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-5 grow">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {donation.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">{donation.notes}</p>
                          <div className="mt-3 text-sm text-gray-500 space-y-1">
                            <p>
                              <span className="font-medium text-gray-700">Kompania:</span>{" "}
                              {donation.donor.business_name}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Kategoria:</span>{" "}
                              {donation.category?.name || "Ushqim"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Adresa:</span>{" "}
                              {donation.address}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Qyteti:</span>{" "}
                              {donation.city?.name}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Skadon më:</span>{" "}
                              {donation.expiration_date
                                ? (() => {
                                  const date = new Date(donation.expiration_date);
                                  const day = date.getDate().toString().padStart(2, '0');
                                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                  const year = date.getFullYear();
                                  return `${day}.${month}.${year}`;
                                })()
                                : "Nuk ka datë skadimi"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Sasia:</span>{" "}
                              {donation.quantity && donation.unit_of_measurement
                                ? `${donation.quantity} ${donation.unit_of_measurement}`
                                : "E panjohur"
                              }
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                          {donation.status === "in-wait" && (
                            <p className="text-center text-sm text-yellow-600 font-medium">
                              Ky donacion është në proces të pranimit
                            </p>
                          )}

                          {donation.status === "active" && (
                            <>
                              {hasApplied ? (
                                <Button
                                  className="flex-1 rounded-lg py-2 text-sm text-white bg-gray-600"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                >
                                  Keni aplikuar tashmë
                                </Button>
                              ) : (
                                <div className="flex gap-3">
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (isAuthenticated()) {
                                        handleDonateClick(donation);
                                      } else {
                                        setShowLoginModal(true);
                                      }
                                    }}
                                    className="flex-1 text-sm"
                                  >
                                    Apliko!
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Jeni të sigurt që dëshironi të aplikoni për këtë donacion?</h3>
            <div className="flex justify-between">
              <Button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Anulo
              </Button>
              <Button
                onClick={handleConfirmApply}
                className={`text-white py-2 px-4 rounded ${isApplying ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                  }`}
                disabled={isApplying}
              >
                {isApplying ? 'Duke aplikuar...' : 'Po, apliko'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Për të aplikuar duhet të jeni të kyçur si përfitues</h2>
            <div className="flex justify-center gap-4 mt-6">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => navigate("/login")}
              >
                Kyçu
              </Button>
              <Button
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => navigate("/recipient")}
              >
                Krijo llogari
              </Button>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Pagination Section */}
      {donations.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    </div>
  );
}
