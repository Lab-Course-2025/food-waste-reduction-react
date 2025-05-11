// src/pages/DonationDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";

export default function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!donation) return <div className="p-6 text-red-600">Donation not found.</div>;

  return (
    <div>
      {/* Header */}
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
              {donation.expiration_date && (
                <li><strong>Skadon më:</strong> {new Date(donation.expiration_date).toLocaleDateString()}</li>
              )}
              <li><strong>Statusi:</strong> {donation.status}</li>
            </ul>
            <div>
              <strong className="block text-sm font-semibold text-gray-700 mb-1">Përshkrimi:</strong>
              <p className="text-gray-700 text-sm leading-relaxed">
                {donation.notes?.trim() ? donation.notes : "Nuk ka përshkrim"}
              </p>
            </div>

            {/* Apliko button */}
            <div className="pt-4">
              <Button
                onClick={() => alert("Aplikimi u dërgua!")} // replace with real logic
                className="px-6 py-2 text-white text-sm font-medium rounded-lg shadow"
              >
                Apliko
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
