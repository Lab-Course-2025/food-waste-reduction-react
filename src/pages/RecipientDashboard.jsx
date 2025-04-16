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
      
    </div>
  )
}
