import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown, Check, ClipboardList, Folder, ListCheck } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { apiClient } from '../utils/apiClient';

export default function DonationDashboard() {

  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [recipient, setRecipient] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalDonations, setTotalDonations] = useState(0); // Track total number of donations

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get('/recipient-applications', {
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
        setLoading(false);
        console.error("Error fetching applications:", error);
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
    const fetchRecipientData = async () => {
      try {
        const response = await apiClient.get('/recipients/profile');

        setRecipient(response.data.data);
        setMeta(response.data.meta);
      } catch (error) {
        console.error("Error fetching recipient data:", error);
      }
    };

    fetchRecipientData();
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
    navigate("/recipient-profile");
  };

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
      <main className="container mx-auto p-4 max-w-6xl">

        {/* Benefits Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-1">Përfitimet e Mia</h2>
          <p className="text-sm text-gray-500 mb-4">Ndjek dhe monaxho përfitimet e tua bamirëse</p>

          <div className="grid grid-cols-3 md:gap-3 gap-3">
            <div className="bg-white md:p-4 py-4 pl-1 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500">Donacionet e Disponueshme</h3>
              <p className="text-3xl font-bold mt-1">{meta?.active_donations}</p>
            </div>
            <div className="bg-white md:p-4 py-4 pl-1 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500">Donacionet e Përfituara</h3>
              <p className="text-3xl font-bold mt-1">{meta?.received_donations}</p>
            </div>
            <div className="bg-white md:p-4 py-4 pl-1 rounded-lg shadow-sm">
              <h3 className="text-sm text-gray-500">Donacionet në Pritje</h3>
              <p className="text-3xl font-bold mt-1">{meta?.in_hold_donations}</p>
            </div>
          </div>
        </section>

        <Link to="/donacionetaktive">
          <Button className="flex items-center text-white mb-2">
            <ClipboardList className="mr-2 h-4 w-4" />
            Shiko donacionet aktive
          </Button>
        </Link>
        <Link to="/recipient-applications">
          <Button className="flex items-center text-white mb-2">
            <Folder className="mr-2 h-4 w-4" />
            Shiko aplikimet në pritje
          </Button>
        </Link>
        <Link to="/recipient-accepted-applications">
          <Button className="flex items-center text-white mb-2">
            <ListCheck className="mr-2 h-4 w-4" />
            Shiko aplikimet e pranuara
          </Button>
        </Link>

        <section className="md:ml-20 md:mr-20 ml-10 mr-10 mt-10">
          <h2 className="text-xl font-bold mb-6 bg-white px-6 py-4 text-center">Historia e Donacioneve</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4 font-medium">EMRI</th>
                  <th className="pb-4 font-medium">DHURUESI</th>
                  <th className="pb-4 font-medium">DATA E KOMPLETIMIT</th>
                  <th className="pb-4 font-medium">ADRESA E DHURUESIT</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Duke u ngarkuar...</td>
                  </tr>
                ) : (
                  <>
                    {applications.length > 0 && applications.map((application) => (
                      <tr key={application.id} className="border-b bg-gray-50">
                        <td className="py-4 px-6">{application.foodListing.name}</td>
                        <td className="py-4 px-6">{application.foodListing?.donor?.business_name || 'N/A'}</td>

                        <td className="py-4 px-6">
                          {application.completed_at ? new Date(application.completed_at).toLocaleDateString() : 'N/A'}
                        </td>

                        {/* Display the recipient address */}
                        <td className="py-4 px-6">
                          {application.foodListing?.donor?.address + ', ' + application.foodListing?.donor?.city?.name || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </>
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

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}
