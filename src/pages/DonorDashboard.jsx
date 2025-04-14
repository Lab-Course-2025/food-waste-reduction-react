import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';

export default function DonationDashboard() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [donor, setDonor] = useState(null);

  const [donations] = useState([
    {
      id: 1,
      description: "Pako Ushqimore 1",
      initiative: "Iniciativa A",
      amount: 500,
      status: "Kompletuar",
      date: "Mars 13, 2025",
    },
    {
      id: 2,
      description: "Pako Ushqimore 1",
      initiative: "Iniciativa B",
      amount: 250,
      status: "Kompletuar",
      date: "Shkurt 1, 2025",
    },
    {
      id: 3,
      description: "Pako Ushqimore 1",
      initiative: "Iniciativa C",
      amount: 100,
      status: "Në Procesim",
      date: "Janar 15, 2025",
    },
  ]);

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
        console.log(response.data);
        setDonor(response.data); // Assuming the response contains the donor's details
      } catch (error) {
        console.error("Error fetching donor data:", error);
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

  // const navigateToLanding = () => {
  //   setProfileMenuOpen(false);
  //   navigate("/");
  // };

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
              {/* <button
                onClick={navigateToLanding}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <Home className="h-4 w-4" />
                Landing Page
              </button> */}
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

        <Link to="/submit">
          <Button className="inline-flex items-center ">
            <PlusCircle className="mr-2 h-4 w-4" />
            Bëj një Donacion të Ri
          </Button>
        </Link>
      </section>

      <section className="md:ml-20 md:mr-20 ml-10 mr-10 mt-10">
        <h2 className="text-xl font-bold mb-6 bg-white px-6 py-4">Historia e Donacioneve</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-4 font-medium">PËRSHKRIMI</th>
                <th className="pb-4 font-medium">PËRFITUESI</th>
                <th className="pb-4 font-medium">VLERA</th>
                <th className="pb-4 font-medium">STATUSI</th>
                <th className="pb-4 font-medium">DATA</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b bg-white px-6 py-4">
                  <td className="py-4 px-6">{donation.description}</td>
                  <td className="py-4 px-6">{donation.initiative}</td>
                  <td className="py-4 px-6">{donation.amount}€</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${donation.status === "Kompletuar"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-4">{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}
