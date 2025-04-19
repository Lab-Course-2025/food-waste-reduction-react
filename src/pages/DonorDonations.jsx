import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button"; // Adjust the import path if needed
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

const cities = [
  "Prishtinë", "Prizren", "Pejë", "Gjakovë", "Mitrovicë", "Ferizaj", "Gjilan",
  "Vushtrri", "Podujevë", "Suharekë", "Rahovec", "Malishevë", "Drenas",
  "Lipjan", "Kamenicë", "Skenderaj", "Deçan", "Istog", "Dragash", "Kaçanik",
  "Shtime", "Fushë Kosovë", "Obiliq", "Klinë", "Novobërdë"
];

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



  const validateForm = () => {
    const newErrors = {};
    if (!selectedDonation.name) {
      newErrors.name = '*E nevojshme.';
    }
    if (!selectedDonation.expiration_date) {
      newErrors.expiration_date = '*E nevojshme.';
    }
    if (!selectedDonation.address?.street) {
      newErrors["address.street"] = '*E nevojshme.';
    }
    if (!selectedDonation.address?.city) {
      newErrors["address.city"] = '*E nevojshme.';
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
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      await axios.delete(`${apiUrl}/food-listings/${donationToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted donation from state
      setDonations((prev) =>
        prev.filter((d) => d.id !== donationToDelete.id)
      );

      toast.success("Donacioni u fshi me sukses!");
    } catch (error) {
      toast.error("Ndodhi një gabim gjatë fshirjes!");
      console.error("Error deleting donation:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDonationToDelete(null);
    }
  };


  const handleUpdateDonation = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      const response = await axios.patch(
        `${apiUrl}/food-listings/${id}`,
        selectedDonation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the data
      const updatedData = await axios.get(`${apiUrl}/donor-food-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(updatedData.data.data);

      toast.success('Donacioni u përditësua me sukses!');
      setIsModalOpen(false);
      setSelectedDonation(null);
    } catch (error) {
      console.error("Error updating donation", error);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(`${apiUrl}/donor-food-listings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,  // Send the current page to the API
            limit: 10,           // Limit the number of items per page (can be dynamic)
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
  }, [currentPage]);

  return (
    <div>
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <button
            onClick={() => navigate(-1)} // 👈 Go back to previous page
            className="cursor-pointer"
          >
            <ArrowLeft className="mr-3 mt-2" size={20} />
          </button>
          <span className="text-base font-medium mt-2">Prapa</span>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <div className="rounded-lg bg-white overflow-hidden">
          <h2 className="py-6 text-center text-2xl font-bold">Donacionet e mia</h2>
          <div className="px-4 pb-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {donations.map((donation) => (
                <div
                  key={donation._id}
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
                        <p><span className="font-medium text-gray-700">Kategoria:</span> {donation.category}</p>
                        <p>
                          <span className="font-medium text-gray-700">Adresa:</span>{" "}
                          {donation.address?.street}, {donation.address?.city}, {donation.address?.country}
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
          </div>
        </div>
      </div>
      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ndrysho Donacionin</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label htmlFor="street" className="block text-sm mb-1">
                  Rruga
                </label>
                <Input
                  id="street"
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={selectedDonation.address?.street || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      address: {
                        ...selectedDonation.address,
                        street: e.target.value,
                      },
                    })
                  }
                />
                {errors["address.street"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.street"]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm mb-1">
                  Qyteti
                </label>
                <select
                  id="city"
                  value={selectedDonation.address?.city || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      address: {
                        ...selectedDonation.address,
                        city: e.target.value,
                      },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${selectedDonation.address?.city === "" ? "text-gray-500" : "text-black"
                    }`}
                >
                  <option className="text-gray-400" value="" disabled>Zgjedh qytetin</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                {errors["address.city"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.city"]}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm"
                >
                  Mbyll
                </button>
                <Button
                  type="submit"
                  className="rounded-md px-4 py-2 text-sm text-white hover:bg-orange-600"
                >
                  Përditëso
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && donationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Konfirmo Fshirjen</h2>
            <p className="text-gray-700 mb-6">
              A jeni i sigurt që dëshironi të fshini donacionin{" "}
              <span className="font-bold">{donationToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Anulo
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteDonation}
              >
                Po, fshij
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
