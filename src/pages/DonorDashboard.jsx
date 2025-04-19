import { useState, useEffect, useRef } from "react";
import { PlusCircle, LogOut, Home, ChevronDown } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';
import Input from "../components/Input";
import { toast } from 'react-hot-toast';


const cities = [
  "Prishtinë", "Prizren", "Pejë", "Gjakovë", "Mitrovicë", "Ferizaj", "Gjilan",
  "Vushtrri", "Podujevë", "Suharekë", "Rahovec", "Malishevë", "Drenas",
  "Lipjan", "Kamenicë", "Skenderaj", "Deçan", "Istog", "Dragash", "Kaçanik",
  "Shtime", "Fushë Kosovë", "Obiliq", "Klinë", "Novobërdë"
];

export default function DonationDashboard() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [donor, setDonor] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [errors, setErrors] = useState({});


  const handleDonateClick = () => {
    setShowDonationForm(true);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedDonation.name) {
      newErrors.name = '*E nevojshme.';
    }
    if (!selectedDonation.expiration_date) {
      newErrors.expiration_date = '*E nevojshme.';
    }
    if (!selectedDonation.address?.street) {
      newErrors["address.street"] = '*E nevojshme.';
    }
    if (!selectedDonation.address?.city) {
      newErrors["address.city"] = '*E nevojshme.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
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

  const handleUpdateDonation = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      const response = await axios.patch(
        `${apiUrl}/food-listings/${id}`,
        selectedDonation,
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

        <Link to="/submit">
          <Button className="inline-flex items-center text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Bëj një Donacion të Ri
          </Button>
        </Link>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <h2 className="py-6 text-center text-2xl font-bold">Donacionet e mia</h2>

            {/* Scrollable donation container */}
            <div className="px-4 pb-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {donations.map((donation) => (
                  <div
                    key={donation._id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative aspect-video">
                      <img
                        src={
                          donation.imageUrl ||
                          "https://www.food-safety.com/ext/resources/Newsletters/GettyImages-1225416626.jpg?height=635&t=1616167053&width=1200"
                        }
                        alt={donation.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-5 grow">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{donation.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{donation.notes}</p>

                        <div className="mt-3 text-sm text-gray-500 space-y-1">
                          <p><span className="font-medium text-gray-700">Kategoria:</span> {donation.category}</p>
                          <p>
                            <span className="font-medium text-gray-700">Adresa:</span>{" "}
                            {donation.address?.street}, {donation.address?.city}, {donation.address?.country}
                          </p>
                          {donation.expiration_date && (
                            <p>
                              <span className="font-medium text-gray-700">Skadon më:</span>{" "}
                              {new Date(donation.expiration_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="mt-5 flex gap-3">
                        <Button
                          onClick={() => handleEditDonation(donation)}
                          className="flex-1 rounded-lg py-2 text-sm text-white hover:bg-orange-600"
                        >
                          Ndrysho
                        </Button>
                        <Button
                          onClick={() => handleDeleteDonation(donation._id)}
                          className="flex-1 rounded-lg bg-red-600 py-2 text-sm text-white hover:bg-red-700"
                        >
                          Fshij
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

      <section className="md:ml-20 md:mr-20 ml-10 mr-10 mt-10">
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
      </section>

      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ndrysho Donacionin</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label htmlFor="street" className="block text-sm mb-1">
                  Rruga
                </label>
                <Input
                  id="street"
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={selectedDonation.address?.street || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      address: {
                        ...selectedDonation.address,
                        street: e.target.value,
                      },
                    })
                  }
                />
                {errors["address.street"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.street"]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm mb-1">
                  Qyteti
                </label>
                <select
                  id="city"
                  value={selectedDonation.address?.city || ""}
                  onChange={(e) =>
                    setSelectedDonation({
                      ...selectedDonation,
                      address: {
                        ...selectedDonation.address,
                        city: e.target.value,
                      },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${selectedDonation.address?.city === "" ? "text-gray-500" : "text-black"
                    }`}
                >
                  <option className="text-gray-400" value="" disabled>Zgjedh qytetin</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                {errors["address.city"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.city"]}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm"
                >
                  Mbyll
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Përditëso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      <footer className="mt-16 text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  );
}
