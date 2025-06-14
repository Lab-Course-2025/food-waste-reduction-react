import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button"; // Adjust the import path if needed
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import { apiClient } from "../utils/apiClient";
import BackHeader from "../components/BackHeader";

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
  const [categories, setCategories] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");


  const validateForm = () => {
    const newErrors = {};
    if (!selectedDonation.name) {
      newErrors.name = '*E nevojshme.';
    }
    if (!selectedDonation.address) {
      newErrors.address = '*E nevojshme.';
    }
    if (!selectedDonation.city) {
      newErrors.city = '*E nevojshme.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleUpdateDonation(selectedDonation.id);
    }
  };

  const handleEditDonation = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
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

  const confirmDeleteDonation = (donation) => {
    setDonationToDelete(donation);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDonation = async () => {
    try {
      await apiClient.delete(`/food-listings/${donationToDelete.id}`);

      // Remove deleted donation from state
      setDonations((prev) =>
        prev.filter((d) => d.id !== donationToDelete.id)
      );

      toast.success("Donacioni u fshi me sukses!");
    } catch (error) {
      toast.error("Ndodhi një gabim gjatë fshirjes!");
    } finally {
      setIsDeleteModalOpen(false);
      setDonationToDelete(null);
    }
  };


  const handleUpdateDonation = async (id) => {
    try {
      const payload = {
        name: selectedDonation.name,
        notes: selectedDonation.notes || "",
        expiration_date: selectedDonation.expiration_date,
        address: selectedDonation.address,
        city: typeof selectedDonation.city === 'object'
          ? selectedDonation.city.id
          : selectedDonation.city,
        category: typeof selectedDonation.category === 'object'
          ? selectedDonation.category.id
          : selectedDonation.category,
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      await apiClient.patch(`/food-listings/${id}`, payload);

      // Refresh the data
      const updatedData = await apiClient.get('/donor-food-listings');
      setDonations(updatedData.data.data);

      toast.success('Donacioni u përditësua me sukses!');
      setIsModalOpen(false);
      setSelectedDonation(null);
    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/cities`);
        setCities(response.data.data);
      } catch (error) {
      }
    };

    const fetchCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data.data);
      } catch (error) {
      }
    };

    fetchCities();
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchDonations = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await apiClient.get(`${apiUrl}/donor-food-listings`, {
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


            {donations.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-center text-gray-600 text-lg">Nuk ke asnjë donacion aktiv</p>
              </div>) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[250px] w-full">
                      <img
                        src={donation.image_url ?? "https://finegrocery.in/wp-content/uploads/2021/05/finegrocery-place-holder-2.jpg"}
                        alt={donation.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-5 grow">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{donation.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{donation.notes}</p>
                        <div className="mt-3 text-sm text-gray-500 space-y-1">
                          <p><span className="font-medium text-gray-700">Kategoria:</span> {donation.category?.name}</p>
                          <p><span className="font-medium text-gray-700">Adresa:</span> {donation.address}</p>
                          <p><span className="font-medium text-gray-700">Qyteti:</span> {donation.city?.name}</p>
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

                        </div>
                      </div>
                      <div className="mt-5 flex gap-3">
                        <Button
                          onClick={() => handleEditDonation(donation)}
                          className="flex-1 rounded-lg py-2 text-sm text-white hover:bg-orange-600"
                        >
                          Ndrysho
                        </Button>
                        <Button
                          onClick={() => confirmDeleteDonation(donation)}
                          className="flex-1 rounded-lg bg-red-600 py-2 text-sm text-white hover:bg-red-700"
                        >
                          Fshij
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ndrysho Donacionin</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm mb-1">
                  Emri
                </label>
                <Input
                  id="name"
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={selectedDonation.name}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="expiration_date" className="block text-sm mb-1">
                  Data e Skadencës
                </label>
                <Input
                  id="expiration_date"
                  name="expiration_date"
                  type="date"
                  value={selectedDonation.expiration_date}
                  className="w-full border-gray-300"
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      expiration_date: e.target.value,
                    })
                  }
                />
                {errors.expiration_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiration_date}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm mb-1">
                  Kategoria
                </label>
                <select
                  name="category"
                  value={selectedDonation.category?.id || selectedDonation.category || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      category: e.target.value,
                    })
                  }
                  className={`w-full shadow-sm px-3 py-2 border rounded-md ${selectedDonation.category === "" ? "text-gray-500" : "text-black"
                    } border-gray-300 focus:outline-none focus:border-orange-500 transition-colors`}
                >
                  <option value="">Zgjedh kategorin</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label htmlFor="address" className="block text-sm mb-1">
                  Rruga
                </label>
                <Input
                  id="address"
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={selectedDonation.address || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      address: e.target.value,
                    })
                  }
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm mb-1">
                  Qyteti
                </label>
                <select
                  name="city"
                  value={selectedDonation.city?.id || selectedDonation.city || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      city: e.target.value,
                    })
                  }
                  className={`w-full shadow-sm px-3 py-2 border rounded-md ${selectedDonation.city === "" ? "text-gray-500" : "text-black"
                    } border-gray-300 focus:outline-none focus:border-orange-500 transition-colors`}
                >
                  <option value="">Zgjedh qytetin</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm mb-1">
                  Shënime
                </label>
                <textarea
                  id="notes"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 border-gray-300"
                  value={selectedDonation.notes}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, notes: e.target.value })
                  }
                />
                {errors.notes && (
                  <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-500 hover:bg-gray-600 px-4 py-2 text-sm"
                >
                  Mbyll
                </Button>
                <Button
                  type="submit"
                  className="rounded-md px-4 py-2 text-sm text-white hover:bg-orange-600"
                  onClick={handleSubmit}
                >
                  Përditëso
                </Button>

              </div>
            </form>

          </div>
        </div>
      )}

      {isDeleteModalOpen && donationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Konfirmo Fshirjen</h2>
            <p className="text-gray-700 mb-6">
              A jeni i sigurt që dëshironi të fshini donacionin{" "}
              <span className="font-bold">{donationToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                className="rounded-md bg-gray-500 hover:bg-gray-600 px-4 py-2 text-sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Anulo
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 text-sm"
                onClick={handleDeleteDonation}
              >
                Fshij
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
}

