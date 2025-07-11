import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { ArrowLeft, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { apiClient } from "../utils/apiClient";
import BackHeader from "../components/BackHeader";

export default function FoodDonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    expiration_date: "",
    notes: "",
    image: null,
    address: "",
    city: "",
    quantity: "",
    unit_of_measurement: "",
  });
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Added categories state


  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/cities`);
        setCities(response.data.data); // access the 'data' array
      } catch (error) {
      }
    };

    const fetchCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data.data);
      } catch (error) {
      }
    };

    fetchCities();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the specific field when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    // Build FormData
    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("expiration_date", formData.expiration_date);
    form.append("notes", formData.notes);
    form.append("address", formData.address);
    form.append("city", formData.city);
    form.append("quantity", formData.quantity);
    form.append("unit_of_measurement", formData.unit_of_measurement);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      setLoading(true);
      const response = await apiClient.post("food-listings", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // if your backend uses auth
        },
      });

      toast.success("Donacioni u shtua me sukses!");

      setTimeout(() => {
        navigate("/donor-dashboard");
      }, 1000);

      // Reset the form
      setFormData({
        name: "",
        category: "",
        expiration_date: "",
        notes: "",
        address: "",
        city: "",
        quantity: "",
        unit_of_measurement: "",
        image: null,
        imagePreview: null,
      });

    } catch (error) {
      if (error.response) {
      } else {
      }
    } finally {
      setLoading(false);
    }
  };



  const validateForm = () => {
    const newErrors = {};

    // Validate top-level fields
    if (!formData.name.trim()) {
      newErrors.name = "*E nevojshme.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "*E nevojshme.";
    }

    if (!formData.expiration_date.trim()) {
      newErrors.expiration_date = "*E nevojshme.";
    }

    // Validate address fields
    if (!formData.address.trim()) {
      newErrors.address = "*E nevojshme.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "*E nevojshme.";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "*E nevojshme.";
    }

    if (!formData.unit_of_measurement.trim()) {
      newErrors.unit_of_measurement = "*E nevojshme.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    navigate(-1);
  };


  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      {/* Header */}
      <BackHeader to={-1} label="Prapa" />


      <div className="flex-1 overflow-auto flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col" autoComplete="off">
            <div className="p-6">
              {/* Donation Details */}
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3">Detajet e Donacionit</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 h-60 bg-gray-50 shadow-lg">
                    {formData.imagePreview ? (
                      <img src={formData.imagePreview} alt="Preview" className="h-full w-full object-cover rounded-md" />
                    ) : (
                      <>
                        <Camera size={32} className="text-gray-400 mb-1" />
                        <p className="text-xs text-gray-500 mb-1">Ngarko një Fotografi</p>
                      </>
                    )}
                    <label className="cursor-pointer text-blue-500 hover:text-blue-600 text-xs">
                      <span>Choose File</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Emri i Donacionit</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="P.sh. Bukë e freskët, Fruta"
                        className="w-full border-gray-300"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Kategoria e Ushqimit</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${formData.category === "" ? "text-gray-500" : "text-black"}`}
                      >
                        <option value="">Zgjedh një kategori</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Sasia</label>
                      <Input
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="P.sh. 10, 20"
                        className="w-full border-gray-300"
                      />
                      {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                      )}
                    </div>

                    {/* Unit of Measurement */}
                    <div>
                      <label className="block text-sm mb-1">Njësia matëse</label>
                      <select
                        name="unit_of_measurement"
                        value={formData.unit_of_measurement}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${formData.category === "" ? "text-gray-500" : "text-black"
                          }`}
                      >
                        <option value="">Zgjedh njësinë</option>
                        <option value="kg">Kilogramë</option>
                        <option value="g">Gramë</option>
                        <option value="l">Litër</option>
                        <option value="ml">Mililitër</option>
                        <option value="pcs">Copa</option>
                        <option value="packs">Paketa</option>
                        <option value="boxes">Kuti</option>
                        <option value="cans">Kanaçe</option>
                        <option value="bottles">Shishe</option>
                        <option value="servings">Racione</option>
                      </select>
                      {errors.unit_of_measurement && (
                        <p className="text-red-500 text-sm mt-1">{errors.unit_of_measurement}</p>
                      )}
                    </div>


                    {/* <div>
                      <label className="block text-sm mb-1">Kategoria e Ushqimit</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${formData.category === "" ? "text-gray-500" : "text-black"
                          }`}
                      >
                        <option value="">Zgjedh një kategori</option>
                        <option value="Bakery">Bukë / Brumëra</option>
                        <option value="Fruits">Fruta</option>
                        <option value="Vegetables">Perime</option>
                        <option value="Cooked">Gatim</option>
                        <option value="Dairy">Produkte të qumështit</option>
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div> */}


                    <div>
                      <label className="block text-sm mb-1">Data e Skadencës</label>
                      <Input
                        name="expiration_date"
                        type="date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                        className="w-full border-gray-300"
                      />
                      {errors.expiration_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiration_date}</p>
                      )}
                    </div>

                  </div>
                </div>

              </div>


              {/* Application Details */}
              <div className="mb-6">
                {/* <h4 className="text-base font-medium mb-3">Detajet e Aplikimit</h4> */}

                {/* Address Section Header */}
                <div className="md:col-span-2 col-span-1 md:text-left text-center font-semibold text-lg">Adresa e donacionit</div>
                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 mt-5">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Adresa</label>
                    <Input name="address" value={formData.address} onChange={handleChange} placeholder="Rruga" className="w-full border-gray-300" />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">Qyteti</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full shadow-sm px-3 py-2 border rounded-md ${formData.city === "" ? "text-gray-500" : "text-black"} border-gray-300 focus:outline-none focus:border-orange-500 transition-colors`}
                    >
                      <option className="text-gray-400" value="" disabled>Zgjedh qytetin</option>
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


              {/* Notes */}
              <div>
                <label className="block text-sm mb-1">Shkrime shtesë</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Informacion tjetër rreth ushqimit ose udhëzimeve për marrje"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 border-gray-300"
                  rows={4}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between px-6 py-4 bg-gray-50 border-t mt-auto">
              <Button
                type="button"
                className="!text-black bg-white border border-gray-300 hover:bg-gray-100 px-6 w-1/2 mr-2.5"
                onClick={handleCancel}
              >
                Anulo
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className={`
                  ${loading
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                  } 
                px-6 w-1/2 ml-2.5
              `}
              >
                {loading ? 'Duke ngarkuar...' : 'Dërgo'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
