import Button from "../components/Button";
import Input from "../components/Input";
import { Home, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from 'axios';
import { toast } from 'react-hot-toast';



export default function UserProfile() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    contact_first_name: "",
    contact_last_name: "",
    contact_title: "",
    contact_phone: "",
    organization_name: "",
    organization_type: "",
    registration_number: "",
    address: "",
    city: ""
  });

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
    const fetchCities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/cities`);
        setCities(response.data.data); // assuming response.data is an array of cities
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
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

        // Update state with the recipient's data
        console.log(response.data);
        setRecipient(response.data);
        setFormData({
          contact_first_name: response.data.contact_first_name || "",
          contact_last_name: response.data.contact_last_name || "",
          contact_title: response.data.contact_title || "",
          contact_phone: response.data.contact_phone || "",
          organization_name: response.data.organization_name || "",
          organization_type: response.data.organization_type || "",
          registration_number: response.data.registration_number || "",
          address: response.data.address || "",
          city: response.data.city?.id || ""
        });
      } catch (error) {
        console.error("Error fetching recipient data:", error);
        // setLoading(false);
      }
    };

    fetchRecipientData();
  }, []);

  const handleNavigateToDashboard = () => {
    navigate("/recipient-dashboard");
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear the error for the specific field when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate top-level fields
    if (!formData.contact_first_name.trim()) {
      newErrors.contact_first_name = "*E nevojshme.";
    }

    if (!formData.contact_last_name.trim()) {
      newErrors.contact_last_name = "*E nevojshme.";
    }
    if (!formData.contact_title.trim()) {
      newErrors.contact_title = "*E nevojshme.";
    }
    if (!formData.contact_phone.trim()) {
      newErrors.contact_phone = "*E nevojshme.";
    }

    if (!formData.organization_name.trim()) {
      newErrors.organization_name = "*E nevojshme.";
    }

    if (!formData.organization_type.trim()) {
      newErrors.organization_type = "*E nevojshme.";
    }

    if (!formData.registration_number.trim()) {
      newErrors.registration_number = "*E nevojshme.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "*E nevojshme.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "*E nevojshme.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const payload = formData;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('authToken');

      const response = await axios.patch(`${apiUrl}/recipients/${recipient.id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Updated successfully:', response.data);
      toast.success("Profili u përditësua me sukses!");

    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      toast.error("Ndodhi një gabim gjatë përditësimit.");
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
              <span>{recipient?.organization_name?.charAt(0) || "F"}</span>
            </div>
            {/* <span className="font-medium">Filan Fisteku</span> */}
            <span className="font-medium">{recipient?.organization_name || "Filan Fisteku"}</span> {/* Fallback to static name */}

            <ChevronDown className="h-4 w-4" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
              <button
                onClick={handleNavigateToDashboard}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
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

      <div className="flex h-full">
        {/* Sidebar */}
        {/* Main Content */}
        <main className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
            {/* Personal Data */}
            <div className="mb-6">
              <div className="md:col-span-2 col-span-1 text-center font-semibold text-lg mt-10 mb-4">Të dhënat e personit pergjegjës</div>

              {/* <h2 className="text-lg font-medium mb-4">Të Dhënat e personit pergjegjës</h2> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Emri</label>
                  <Input
                    name="contact_first_name"
                    value={formData.contact_first_name}
                    onChange={handleChange} />
                  {errors.contact_first_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.contact_first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mbiemri</label>
                  <Input
                    name="contact_last_name"
                    value={formData.contact_last_name}
                    onChange={handleChange} />
                  {errors.contact_last_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.contact_last_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pozita</label>
                  <Input
                    name="contact_title"
                    value={formData.contact_title}
                    onChange={handleChange} />
                  {errors.contact_title && (
                    <p className="text-red-500 text-sm mt-1">{errors.contact_title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefoni</label>
                  <Input
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange} />
                  {errors.contact_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.contact_phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Data */}
            <div className="mb-6">
              <div className="md:col-span-2 col-span-1 text-center font-semibold text-lg mt-10 mb-4">Të dhënat e organizates</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Emri i Organizatës</label>
                  <Input
                    name="business_name"
                    value={formData.organization_name}
                    onChange={handleChange} />
                  {errors.business_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.organization_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Numri i organizatës</label>
                  <Input
                    name="business_number"
                    value={formData.registration_number}
                    onChange={handleChange} />
                  {errors.business_number && (
                    <p className="text-red-500 text-sm mt-1">{errors.registration_number}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lloji i organizatës</label>
                  <Input
                    name="business_number"
                    value={formData.organization_type}
                    onChange={handleChange} />
                  {errors.business_number && (
                    <p className="text-red-500 text-sm mt-1">{errors.registration_number}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Data */}
            <div className="mb-6">
              <div className="md:col-span-2 col-span-1 text-center font-semibold text-lg mt-10 mb-4">Të dhënat e  adresës së biznesit</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Adresa</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange} />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Qyteti</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full shadow-sm px-3 py-2 border rounded-md ${formData.city === "" ? "text-gray-500" : "text-black"} border-gray-300 focus:outline-none focus:border-orange-500 transition-colors`}
                  >
                    <option value="">Zgjedh qytetin</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}

                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button className="text-white">Ruaj Ndryshimet</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
