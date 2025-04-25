import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown, Check, ClipboardList, Folder } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleDonateClick = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleConfirmApply = () => {
    // Apply logic here (e.g., call an API to apply for the donation)
    toast.success("You have successfully applied for the donation.");
    handleCloseModal();
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
    const fetchFirstThreeDonations = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(`${apiUrl}/food-listings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response.data.data);
        setDonations(response.data.data);
      } catch (error) {
        console.error("Error fetching top donations:", error);
      }
    };

    fetchFirstThreeDonations();
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
    navigate("/recipient-profile");
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

        <Link to="/donacionetaktive">
          <Button className="flex items-center text-white mb-2">
            <ClipboardList className="mr-2 h-4 w-4" />
            Shiko të gjitha listimet
          </Button>
        </Link>
        <Link to="/recipient-applications">
          <Button className="flex items-center text-white mb-2">
            <Folder className="mr-2 h-4 w-4" />
            Shiko të gjitha aplikimet
          </Button>
        </Link>

        {/* Available Donations */}
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
              <h2 className="py-6 text-center text-2xl font-bold">Donacionet e fundit</h2>

              {/* Scrollable donation container */}
              <div className="px-4 pb-6">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" >
                  {donations.slice(0, 3).map((donation, index) => (
                    <div
                      key={donation.id || index}
                      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={
                            donation.image ||
                            "https://www.food-safety.com/ext/resources/Newsletters/GettyImages-1225416626.jpg?height=635&t=1616167053&width=1200"
                          }
                          alt={donation.name || "Donacion"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-5 grow">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {donation.name || "Pako Ushqimi"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {donation.notes || "Ushqime për familjet në nevojë"}
                          </p>
                          <div className="mt-3 text-sm text-gray-500 space-y-1">
                            <p>
                              <span className="font-medium text-gray-700">Kompania:</span>{" "}
                              {donation.donor.business_name || "Kompani e panjohur"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Kategoria:</span>{" "}
                              {donation.category?.name || "Ushqim"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Adresa:</span>{" "}
                              {donation.address || "Nuk ka rrugë"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Qyteti:</span>{" "}
                              {donation.city?.name || "Nuk ka qyetet"}
                            </p>
                            {donation.expiration_date && (
                              <p>
                                <span className="font-medium text-gray-700">Skadon më:</span>{" "}
                                {new Date(donation.expiration_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-5 flex gap-3">
                          <Button
                            onClick={() => handleDonateClick(donation)}
                            className="flex-1 rounded-lg py-2 text-sm text-white hover:bg-orange-600"
                          >
                            Apliko!
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/*Trego më shumë button*/}
              <div className="flex justify-center py-4 border-t">
                <Link to="/donacionetaktive">
                  <Button className="text-white hover:bg-orange-600">Trego Më Shumë</Button>
                </Link>
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
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Po, apliko
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}
