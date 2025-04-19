import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown, ClipboardList } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';

export default function DonationDashboard() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [donor, setDonor] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDonateClick = () => {
    setShowDonationForm(true);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Fetch donor data when the component mounts
    const fetchDonorData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${apiUrl}/donors/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use the token for authentication
          },
        });

        // Update state with the donor's data
        // console.log(response.data);
        setDonor(response.data);

        setLoading(true);
        // Fetch food listings or donations posted by the donor
        const donationsResponse = await axios.get(`${apiUrl}/donor-food-listings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // console.log(donationsResponse.data);
        setDonations(donationsResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donor data:", error);
        setLoading(false);
      }
    };

    fetchDonorData();
  }, []);

  const handleLogout = async () => {
    console.log("Logging out...");

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(`${apiUrl}/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` // or sessionStorage if you're storing the token there
        }
      });

      console.log(response.data.message); // This will log "Logged out successfully"
      setProfileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNavigateToProfile = () => {
    navigate("/donor-profile");
  };

  const navigateToDonationsPage = () => {
    navigate("/donations");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      {/* Header with dropdown */}
      <header className="flex justify-between items-center mb-8 bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/" className="font-bold text-black ml-2">
            Ndihmo Tjetrin
          </Link>
        </div>
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
              <span>{donor?.business_name?.charAt(0) || "F"}</span>
            </div>
            {/* <span className="font-medium">Filan Fisteku</span> */}
            <span className="font-medium">{donor?.business_name || "Filan Fisteku"}</span> {/* Fallback to static name */}

            <ChevronDown className="h-4 w-4" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
              <button
                onClick={handleNavigateToProfile}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                Profili
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Rest of the donor dashboard */}
      <section className="md:ml-20 md:mr-20 ml-10 mr-10">
        <h2 className="text-xl font-bold mb-2">Donacionet e mia</h2>
        <p className="text-gray-600 mb-8">Ndjek dhe menaxho dhurimet e tua bamirëse</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-1">Donacionet Totale</p>
            <p className="text-3xl font-bold">2,450€</p>
          </div>
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-1">Donacionet këtë vit</p>
            <p className="text-3xl font-bold">850€</p>
          </div>
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-1">Numri i Donacioneve</p>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        <Link to="/donor-donations">
          <Button className="flex items-center text-white mb-2">
            <ClipboardList className="mr-2 h-4 w-4" />
            Shiko listimet
          </Button>
        </Link>

        <Link to="/submit">
          <Button className="flex items-center text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Shto një donacion
          </Button>
        </Link>

      </section>

      {/* <section className="md:ml-20 md:mr-20 ml-10 mr-10 mt-10">
        <h2 className="text-xl font-bold mb-6 bg-white px-6 py-4">Historia e Donacioneve</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-4 font-medium">EMRI</th>
                <th className="pb-4 font-medium">PËRSHKRIMI</th>
                <th className="pb-4 font-medium">KATEGORIA</th>
                <th className="pb-4 font-medium">DATA E SKADENCËS</th>
                <th className="pb-4 font-medium">DATA E POSTIMIT</th>
                <th className="pb-4 font-medium">ADRESA</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Duke u ngarkuar...</td>
                </tr>
              ) : donations.length > 0 ? donations.map((donation) => (
                <tr key={donation.id} className="border-b bg-white px-6 py-4">
                  <td className="py-4 px-6">{donation.name}</td>
                  <td className="py-4 px-6">{donation.notes ? donation.notes : 'Nuk ka pershkrim'}</td>
                  <td className="py-4 px-6">{donation.category}</td>
                  <td className="py-4 px-6">
                    {(() => {
                      const date = new Date(donation.created_at);
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();

                      return `${day}-${month}-${year}`;
                    })()}
                  </td>
                  <td className="py-4 px-6">
                    {(() => {
                      const date = new Date(donation.created_at);
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      const hours = String(date.getHours()).padStart(2, '0');
                      const minutes = String(date.getMinutes()).padStart(2, '0');

                      return `${day}-${month}-${year}, ${hours}:${minutes}`;
                    })()}
                  </td>
                  <td className="py-4 px-6">{donation.address ? `${donation.address.city}, ${donation.address.street}` : 'Nuk ka adresë'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">Nuk ka donacione të disponueshme.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </section> */}

      {/* <footer className="mt-16 text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer> */}
    </div>
  );
}
