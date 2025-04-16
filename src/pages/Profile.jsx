// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Button  from "../components/Button"
import  Input  from "../components/Input"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LayoutDashboard, LogOut } from "lucide-react"
import { useState, useEffect, useRef } from "react";
import { PlusCircle, Home, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';



export default function UserProfile() {
    const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [donor, setDonor] = useState(null);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center bg-white border-b px-6 py-4">
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

      <div className="flex h-full">
        {/* Sidebar */}
        

        {/* Main Content */}
        <main className="flex-1 p-6">
          <form className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
            {/* Personal Data */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Të Dhënat Personale</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Emri</label>
                  <Input defaultValue="Filan" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Mbiemri</label>
                  <Input defaultValue="Fisteku" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Pozita</label>
                  <Input defaultValue="CEO" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Telefoni</label>
                  <Input defaultValue="049 xxx xxx" />
                </div>
              </div>
            </div>

            {/* Business Data */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Të Dhënat e Biznesit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Emri i Biznesit</label>
                  <Input defaultValue="Korporata X" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Numri i Biznesit</label>
                  <Input defaultValue="0011001" />
                </div>
              </div>
            </div>

            {/* Address Data */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Të Dhënat e Adresës</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Rruga</label>
                  <Input defaultValue='Rruga "Kosova"' />
                </div>
                <div>
                  <label className="block text-sm mb-1">Kodi Postar</label>
                  <Input defaultValue="40000" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Qyteti</label>
                  <Input defaultValue="Mitrovicë" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Shteti</label>
                  <Input defaultValue="Kosovë" />
                </div>
              </div>
            </div>

            {/* Login Data */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Të Dhënat e Llogarisë</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <Input defaultValue="filan.fisteku@gmail.com" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Ndryshoni Passwordin</label>
                  <Input type="password" defaultValue="••••••••" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button className="bg-orange-500 hover:bg-orange-600">Ruaj Ndryshimet</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
