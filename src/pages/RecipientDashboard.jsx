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

const handleNavigateToProfile = () => {
    navigate("/profile");
};

    
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/" className="font-bold text-black ml-2">
            Ndihmo Tjetrin
          </Link>
        </div>
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2 cursor-pointer"
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

      {/* Main Content */}
      
    </div>
  )
}
