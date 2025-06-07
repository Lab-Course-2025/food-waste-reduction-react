import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import BackHeader from "../components/BackHeader";

export default function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
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

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const checkIfApplied = async () => {
    try {
      const response = await apiClient.get(`/recipient-applications`);
      const applications = response.data.data;
      const alreadyApplied = applications.some(app => app.foodListing.id === id);
      setHasApplied(alreadyApplied);
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };


  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await apiClient.get(`/food-listings/${id}`);
        setDonation(response.data);
      } catch (error) {
        console.error("Error fetching donation details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
    checkIfApplied();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!donation) return <div className="p-6 text-red-600">Donation not found.</div>;

  const handleDonateClick = (donation) => {
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmApply = async () => {
    setIsApplying(true);
    try {
      const response = await apiClient.post('/applications', {
        food_listing: donation.id
      });

      toast.success("Aplikimi u krye me sukses!");
      handleCloseModal();
      checkIfApplied();
    } catch (error) {
      console.error("Ndodhi një gabim gjatë aplikimit", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <BackHeader to={-1} label="Prapa" />


      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <img
            src={donation.image_url || "https://finegrocery.in/wp-content/uploads/2021/05/finegrocery-place-holder-2.jpg"}
            alt={donation.name}
            className="w-full h-100 object-cover"
          />
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{donation.name}</h2>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><strong>Kompania:</strong> {donation.donor?.business_name}</li>
              <li><strong>Kategoria:</strong> {donation.category?.name || "Ushqim"}</li>
              <li><strong>Adresa:</strong> {donation.address}</li>
              <li><strong>Qyteti:</strong> {donation.city?.name}</li>
              <li>
                <strong>Skadon më:</strong>{" "}
                {donation.expiration_date
                  ? (() => {
                    const date = new Date(donation.expiration_date);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                    const year = date.getFullYear();
                    return `${day}.${month}.${year}`;
                  })()
                  : "Nuk ka datë skadimi"}
              </li>
              <li>
                <strong>Sasia:</strong>{" "}
                {donation.quantity && donation.unit_of_measurement
                  ? `${donation.quantity} ${donation.unit_of_measurement}`
                  : "E panjohur"
                }
              </li>
            </ul>
            <div>
              <strong className="block text-sm font-semibold text-gray-700 mb-1">Përshkrimi:</strong>
              <p className="text-gray-700 text-sm leading-relaxed">
                {donation.notes?.trim() ? donation.notes : "Nuk ka përshkrim"}
              </p>
            </div>

            {/* Apliko button */}
            <div className="pt-4">
              {hasApplied ? (
                <Button className="flex-1 rounded-lg py-2 text-sm text-white bg-gray-600" disabled>
                  Keni aplikuar tashmë
                </Button>
              ) : <Button
                onClick={() => {
                  if (isAuthenticated()) {
                    handleDonateClick();
                  } else {
                    setShowLoginModal(true);
                  }
                }}
                className="px-6 py-2 text-white text-sm font-medium rounded-lg shadow"
              >
                Apliko
              </Button>
              }
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
                className="bg-gray-400 text-gray-700 hover:bg-gray-500"
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
    </div>
  );
}
