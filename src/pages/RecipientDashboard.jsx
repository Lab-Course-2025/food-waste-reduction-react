import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown, Check } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';

export default function DonationDashboard() {

  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [recipient, setRecipient] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // Fetch recipient data when the component mounts
    const fetchRecipientData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${apiUrl}/recipients/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use the token for authentication
          },
        });

        // console.log(response.data);
        setRecipient(response.data);
      } catch (error) {
        console.error("Error fetching recipient data:", error);

      }
    };

    fetchRecipientData();
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
    navigate("/profile");
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/" className="font-bold text-black ml-2 hidden sm:inline">
            Ndihmo Tjetrin
          </Link>
        </div>
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
              <span>{recipient?.organization_name?.charAt(0) || "F"}</span>
            </div>
            {/* <span className="font-medium">Filan Fisteku</span> */}
            <span className="font-medium">{recipient?.organization_name || "Filan Fisteku"}</span> {/* Fallback to static name */}

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

      {/* Main Content */}
      <main className="container mx-auto p-4 max-w-5xl">
        {/* Benefits Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-1">Përfitimet e Mia</h2>
          <p className="text-sm text-gray-500 mb-4">Ndjek dhe monaxho përfitimet e tua bamirëse</p>

          <div className="grid grid-cols-3 md:gap-3 gap-3">
            <div className="bg-white md:p-4 py-4 pl-1 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500">Donacionet e Disponueshme</h3>
              <p className="text-3xl font-bold mt-1">24</p>
            </div>
            <div className="bg-white md:p-4 py-4 pl-1 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500">Donacionet e Përfituara</h3>
              <p className="text-3xl font-bold mt-1">12</p>
            </div>
            <div className="bg-white md:p-4 py-4 pl-1 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500">Donacionet në Pritje</h3>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
          </div>
        </section>

        {/* Available Donations */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Donacionet e Disponueshme</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Donation Card 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-300 h-[120px] flex items-center justify-center">
                <span className="text-white">Foto e pakos</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Pako Ushqimi nga X</h3>
                <p className="text-sm text-gray-500">Përmban: Vaj, Sheqer dhe Miell.</p>
              </div>
              <div className="flex justify-between p-4 pt-0">
                <span className="text-sm text-gray-500">Mitrovicë</span>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Apliko</Button>
              </div>
            </div>

            {/* Donation Card 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-300 h-[120px] flex items-center justify-center">
                <span className="text-white">Foto e pakos</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Pako e Rrobave nga Y</h3>
                <p className="text-sm text-gray-500">Përmban: Rroba për të rriturit dhe fëmijë.</p>
              </div>
              <div className="flex justify-between p-4 pt-0">
                <span className="text-sm text-gray-500">Prishtinë</span>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Apliko</Button>
              </div>
            </div>

            {/* Donation Card 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-300 h-[120px] flex items-center justify-center">
                <span className="text-white">Foto e pakos</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Pako Ushqimi nga Z</h3>
                <p className="text-sm text-gray-500">Përmban: Arra, Miell dhe Patate.</p>
              </div>
              <div className="flex justify-between p-4 pt-0">
                <span className="text-sm text-gray-500">Pejë</span>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Apliko</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Activity History */}
        <section className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Historia e Aktivitetit</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Pako Ushqimi nga X</h3>
                <p className="text-sm text-gray-500">Qyteti: Mitrovicë</p>
              </div>
              <span className="text-sm text-gray-500">Para 2 ditësh</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Pako e Rrobave nga Y</h3>
                <p className="text-sm text-gray-500">Qyteti: Prishtinë</p>
              </div>
              <span className="text-sm text-gray-500">Para 3 ditësh</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Pako Ushqimi nga Z</h3>
                <p className="text-sm text-gray-500">Qyteti: Pejë</p>
              </div>
              <span className="text-sm text-gray-500">Para 4 ditësh</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}
