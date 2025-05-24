import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown, ClipboardList, List, ListCheck } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';
import Input from "../components/Input";
import { toast } from "react-hot-toast";
import { apiClient } from '../utils/apiClient';

export default function DonationDashboard() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [donor, setDonor] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalDonations, setTotalDonations] = useState(0); // Track total number of donations

  const handleDonateClick = () => {
    setShowDonationForm(true);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/donor-applications', {
          params: {
            status: "completed",
            sort: "completed_at",
            page: currentPage,
            limit: 10,
          }
        });

        setApplications((prevApplications) => {
          const newApplications = response.data.data.filter(
            (newApp) => !prevApplications.some((app) => app.id === newApp.id)
          );
          return [...prevApplications, ...newApplications];
        });

        setTotalDonations(response.data.meta.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentPage]);

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
    const fetchDonorData = async () => {
      try {
        const response = await apiClient.get('/donors/profile');

        setDonor(response.data.data);
        setMeta(response.data.meta);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonorData();
  }, []);

  const handleLogout = async () => {
    console.log("Logging out...");

    try {
      const response = await apiClient.post('/logout');

      console.log(response.data.message);

      // Remove auth data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("refreshToken");

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

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      {/* Header with dropdown */}
      <header className="flex justify-between items-center mb-8 bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/donor-dashboard  " className="font-bold text-black ml-2">
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

      <main className="container mx-auto p-4 max-w-6xl">
        {/* Rest of the donor dashboard */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Donacionet e mia</h2>
          <p className="text-gray-600 mb-8">Ndjek dhe menaxho dhurimet e tua bamirëse</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg border bg-white shadow-sm p-6">
              <p className="text-gray-500 text-sm mb-1">Donacionet Aktive</p>
              <p className="text-3xl font-bold">{meta?.active_donations}</p>
            </div>
            <div className="rounded-lg border bg-white shadow-sm p-6">
              <p className="text-gray-500 text-sm mb-1">Donacionet e dhuruara</p>
              <p className="text-3xl font-bold">{meta?.donated_donations}</p>
            </div>
            <div className="rounded-lg border bg-white shadow-sm p-6">
              <p className="text-gray-500 text-sm mb-1">Donacionet në pritje</p>
              <p className="text-3xl font-bold">{meta?.in_hold_donations}</p>
            </div>
          </div>

          <Link to="/donor-donations">
            <Button className="flex items-center text-white mb-2">
              <ClipboardList className="mr-2 h-4 w-4" />
              Shiko të gjitha listimet
            </Button>
          </Link>

          <Link to="/submit">
            <Button className="flex items-center text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Shto një donacion
            </Button>
          </Link>

          <Link to="/donor-applications">
            <Button className="flex items-center text-white mt-2">
              <List className="mr-2 h-4 w-4" />
              Shiko aplikimet
            </Button>
          </Link>

          <Link to="/donor-accepted-applications">
            <Button className="flex items-center text-white mt-2">
              <ListCheck className="mr-2 h-4 w-4" />
              Shiko aplikimet e pranuara
            </Button>
          </Link>

        </section>

        <section className="md:ml-20 md:mr-20 ml-10 mr-10 mt-10">
          <h2 className="text-xl font-bold mb-6 bg-white px-6 py-4 text-center">Historia e Donacioneve</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4 font-medium">EMRI</th>
                  <th className="pb-4 font-medium">PËRFITUESI</th>
                  <th className="pb-4 font-medium">DATA E KOMPLETIMIT</th>
                  <th className="pb-4 font-medium">ADRESA E PËRFITUESIT</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Duke u ngarkuar...</td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Nuk ka asnjë donacion të dhuruar.
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application.id} className="border-b bg-gray-50">
                      <td className="py-4 px-6">{application.foodListing.name}</td>
                      <td className="py-4 px-6">{application.recipient?.organization_name || 'N/A'}</td>
                      <td className="py-4 px-6">
                        {application.completed_at ? new Date(application.completed_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        {application.recipient?.address && application.recipient?.city?.name
                          ? `${application.recipient.address}, ${application.recipient.city.name}`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>


            </table>
            <div className="mt-4 text-center">
              {applications.length < totalDonations && ( // Show the button only if more items are available
                <Button
                  className="px-4 py-2 text-white rounded"
                  onClick={handleShowMore}
                >
                  Show More
                </Button>
              )}
            </div>

          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div >
  );
}
