import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown, ClipboardList, List, ListCheck } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';
import Input from "../components/Input";
import { toast } from "react-hot-toast";

export default function DonationDashboard() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [donor, setDonor] = useState(null);
  const [donations, setDonations] = useState([]);
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



  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleUpdateDonation(selectedDonation.id);
    }
  };

  const handleEditDonation = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const confirmDeleteDonation = (donation) => {
    setDonationToDelete(donation);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDonation = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      await axios.delete(`${apiUrl}/food-listings/${donationToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted donation from state
      setDonations((prev) =>
        prev.filter((d) => d.id !== donationToDelete.id)
      );

      toast.success("Donacioni u fshi me sukses!");
    } catch (error) {
      toast.error("Ndodhi një gabim gjatë fshirjes!");
      console.error("Error deleting donation:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDonationToDelete(null);
    }
  };


  const handleUpdateDonation = async (id) => {
    try {
      const payload = {
        name: selectedDonation.name,
        notes: selectedDonation.notes || "",
        expiration_date: selectedDonation.expiration_date,
        address: selectedDonation.address,
        city: typeof selectedDonation.city === 'object'
          ? selectedDonation.city.id
          : selectedDonation.city,
        category: typeof selectedDonation.category === 'object'
          ? selectedDonation.category.id
          : selectedDonation.category,
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      const response = await axios.patch(
        `${apiUrl}/food-listings/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the data
      const updatedData = await axios.get(`${apiUrl}/donor-food-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(updatedData.data.data);

      toast.success('Donacioni u përditësua me sukses!');
      setIsModalOpen(false);
      setSelectedDonation(null);
    } catch (error) {
      console.error("Error updating donation", error);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${apiUrl}/donor-applications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            status: "completed",
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
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [currentPage]);

  const validateForm = () => {
    const newErrors = {};
    if (!selectedDonation.name) {
      newErrors.name = '*E nevojshme.';
    }
    if (!selectedDonation.address) {
      newErrors.address = '*E nevojshme.';
    }
    if (!selectedDonation.city) {
      newErrors.city = '*E nevojshme.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/cities`);
        setCities(response.data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCities();
    fetchCategories();
  }, []);

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
                ) : (
                  <>
                    {applications.length > 0 && applications.map((application) => (
                      <tr key={application.id} className="border-b bg-gray-50">
                        <td className="py-4 px-6">{application.foodListing.name}</td>
                        <td className="py-4 px-6">{application.recipient?.organization_name || 'N/A'}</td>

                        <td className="py-4 px-6">
                          {application.completed_at ? new Date(application.completed_at).toLocaleDateString() : 'N/A'}
                        </td>

                        {/* Display the recipient address */}
                        <td className="py-4 px-6">
                          {application.recipient?.address + ', ' + application.recipient?.city?.name || 'N/A'}
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

      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ndrysho Donacionin</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm mb-1">
                  Emri
                </label>
                <Input
                  id="name"
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={selectedDonation.name}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="expiration_date" className="block text-sm mb-1">
                  Data e Skadencës
                </label>
                <Input
                  id="expiration_date"
                  name="expiration_date"
                  type="date"
                  value={selectedDonation.expiration_date}
                  className="w-full border-gray-300"
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      expiration_date: e.target.value,
                    })
                  }
                />
                {errors.expiration_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiration_date}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm mb-1">
                  Kategoria
                </label>
                <select
                  name="category"
                  value={selectedDonation.category?.id || selectedDonation.category || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      category: e.target.value,
                    })
                  }
                  className={`w-full shadow-sm px-3 py-2 border rounded-md ${selectedDonation.category === "" ? "text-gray-500" : "text-black"
                    } border-gray-300 focus:outline-none focus:border-orange-500 transition-colors`}
                >
                  <option value="">Zgjedh kategorin</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label htmlFor="address" className="block text-sm mb-1">
                  Rruga
                </label>
                <Input
                  id="address"
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={selectedDonation.address || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      address: e.target.value,
                    })
                  }
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm mb-1">
                  Qyteti
                </label>
                <select
                  name="city"
                  value={selectedDonation.city?.id || selectedDonation.city || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      city: e.target.value,
                    })
                  }
                  className={`w-full shadow-sm px-3 py-2 border rounded-md ${selectedDonation.city === "" ? "text-gray-500" : "text-black"
                    } border-gray-300 focus:outline-none focus:border-orange-500 transition-colors`}
                >
                  <option value="">Zgjedh qytetin</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm mb-1">
                  Shënime
                </label>
                <textarea
                  id="notes"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 border-gray-300"
                  value={selectedDonation.notes}
                  onChange={(e) =>
                    setSelectedDonation({ ...selectedDonation, notes: e.target.value })
                  }
                />
                {errors.notes && (
                  <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm"
                >
                  Mbyll
                </Button>
                <Button
                  type="submit"
                  className="rounded-md px-4 py-2 text-sm text-white hover:bg-orange-600"
                  onClick={handleSubmit}
                >
                  Përditëso
                </Button>

              </div>
            </form>

          </div>
        </div>
      )}

      {isDeleteModalOpen && donationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Konfirmo Fshirjen</h2>
            <p className="text-gray-700 mb-6">
              A jeni i sigurt që dëshironi të fshini donacionin{" "}
              <span className="font-bold">{donationToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Anulo
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteDonation}
              >
                Fshij
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div >
  );
}
