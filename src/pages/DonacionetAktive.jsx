import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button"; // Adjust the import path if needed
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

export default function DonorDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleUpdateDonation(selectedDonation.id);
    }
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

  const handleConfirmApply = () => {
    // Apply logic here (e.g., call an API to apply for the donation)
    toast.success("You have successfully applied for the donation.");
    handleCloseModal();
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

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(`${apiUrl}/food-listings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,  // Send the current page to the API
            limit: 9,           // Limit the number of items per page (can be dynamic)
            city: selectedCity || undefined, // only send if selected
          },
        });
        // Update donations and pagination data
        setDonations(response.data.data);
        setTotalPages(response.data.meta.last_page); // Assuming the API sends the total number of pages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    };

    fetchDonations();
  }, [currentPage, selectedCity]);

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
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <div className="rounded-lg bg-white overflow-hidden">
          <h2 className="py-6 text-center text-2xl font-bold">Donacionet e mia</h2>
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
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <img
                      src={
                        donation.imageUrl ||
                        "https://www.food-safety.com/ext/resources/Newsletters/GettyImages-1225416626.jpg?height=635&t=1616167053&width=1200"
                      }
                      alt={donation.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-5 grow">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{donation.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{donation.notes}</p>
                      <div className="mt-3 text-sm text-gray-500 space-y-1">
                        <p><span className="font-medium text-gray-700">Kompania:</span> {donation.donor.business_name}</p>
                        <p><span className="font-medium text-gray-700">Kategoria:</span> {donation.category}</p>
                        <p>
                          <span className="font-medium text-gray-700">Adresa:</span>{" "}
                          {donation.address}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">Qyteti:</span>{" "}
                          {donation.city?.name}
                        </p>
                        {donation.expiration_date && (
                          <p>
                            <span className="font-medium text-gray-700">Skadon më:</span>{" "}
                            {new Date(donation.expiration_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <Button
                        onClick={() => handleDonateClick(donation)}
                        className="flex-1 rounded-lg py-2 text-sm text-white hover:bg-orange-600"
                      >
                        Apliko!
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Po, apliko
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
}
