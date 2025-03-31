"use client";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Globe, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import dphoto from "../assets/donors-photo.png";
import axios from 'axios';



const Donors = () => {

  const [formData, setFormData] = useState({
    business_name: "",
    business_number: "",
    contact_first_name: "",
    contact_last_name: "",
    contact_title: "",
    contact_phone: "",
    email: "",
    password: "",
    address: {
      street: "",
      postcode: "",
      city: "",
      country: "Kosova", // Default value since it's fixed
    }
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string" && !formData[key].trim()) {
        newErrors[key] = "*E nevojshme. ";
      } else if (typeof formData[key] === "object" && formData[key] !== null) {
        console.log(`Validating object: ${key}`, formData[key]);

        // Validate address fields
        Object.keys(formData[key]).forEach((subKey) => {
          const value = formData[key][subKey];
          console.log(`Checking ${key}.${subKey}:`, value); // Debug log

          if (typeof value !== "string" || !value.trim()) {
            console.log(`❌ Invalid: ${key}.${subKey}`);

            newErrors[`${key}.${subKey}`] = "*E nevojshme.";
          }
        });
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if there are validation errors
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/donors/register`, formData);
      console.log("Success:", response.data);
      navigate('/LogIn');
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      // alert("Registration failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen" >
      {/* Header */}
      < Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative h-[600px] w-full overflow-hidden">
            <img
              src={dphoto}
              alt="Food donation volunteers"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bashkohuni Kundër Luftës së Humbjes së Ushqimit</h1>
            <p className="max-w-2xl mx-auto mb-6 text-sm md:text-base">
              Bëhu dhurues sot dhe ndihmo në reduktimin e mbetjeve ushqimore ndërsa ushqen ata që kanë nevojë.
            </p>
            <Link to="/submit">
              <Button className="hover:bg-orange-600 text-white rounded-md px-6">
                Regjistrohu Tani!
              </Button>
            </Link>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12 px-4">
          <div className="max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
            <h2 className="text-xl font-bold text-center mb-8">Forma e Regjistrimit të Donatorëve</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  Emri i biznesit
                </label>
                <Input name="business_name" value={formData.business_name} onChange={handleChange} placeholder="Emri i biznesit" className="w-full border-gray-300" />
                {errors.business_name && <p className="text-red-500 text-sm font-regular mt-1">{errors.business_name}</p>}
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  Numri i biznesit
                </label>
                <Input name="business_number" value={formData.business_number} onChange={handleChange} placeholder="Numri i biznesit" className="w-full border-gray-300" />
                {errors.business_number && <p className="text-red-500 text-sm font-regular mt-1">{errors.business_number}</p>}
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  Emri i personit pergjegjes
                </label>
                <Input name="contact_first_name" value={formData.contact_first_name} onChange={handleChange} placeholder="Emri i personit pergjegjes" className="w-full border-gray-300" />
                {errors.contact_first_name && <p className="text-red-500 text-sm font-regular mt-1">{errors.contact_first_name}</p>}
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  Mbiemri i personit pergjegjes
                </label>
                <Input name="contact_last_name" value={formData.contact_last_name} onChange={handleChange} placeholder="Mbiemri i personit pergjegjes" className="w-full border-gray-300" />
                {errors.contact_last_name && <p className="text-red-500 text-sm font-regular mt-1">{errors.contact_last_name}</p>}
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  Pozita e personit pergjegjes
                </label>
                <Input name="contact_title" value={formData.contact_title} onChange={handleChange} placeholder="Pozita e personit pergjegjes" className="w-full border-gray-300" />
                {errors.contact_title && <p className="text-red-500 text-sm font-regular mt-1">{errors.contact_title}</p>}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Numri i telefonit i personit pergjegjes
                </label>
                <Input name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="+355 69 XXX XXXX" className="w-full border-gray-300" />
                {errors.contact_phone && <p className="text-red-500 text-sm font-regular mt-1">{errors.contact_phone}</p>}
              </div>

              {/* Adresa */}
              <div>
                <label htmlFor="street" className="block text-sm font-medium mb-1">
                  Rruga
                </label>
                <Input name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Rruga" className="w-full border-gray-300" />
                {errors["address.street"] && <p className="text-red-500 text-sm font-regular mt-1">{errors["address.street"]}</p>}
              </div>

              <div>
                <label htmlFor="postcode" className="block text-sm font-medium mb-1">
                  Kodi Postar
                </label>
                <Input name="address.postcode" value={formData.address.postcode} onChange={handleChange} placeholder="40000" className="w-full border-gray-300" />
                {errors["address.postcode"] && <p className="text-red-500 text-sm font-regular mt-1">{errors["address.postcode"]}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  Qyteti
                </label>
                <Input name="address.city" value={formData.address.city} onChange={handleChange} placeholder="Mitrovicë" className="w-full border-gray-300" />
                {errors["address.city"] && <p className="text-red-500 text-sm font-regular mt-1">{errors["address.city"]}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Shteti
                </label>
                <Input name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Kosova" className="w-full border-gray-300" disabled />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="emri.mbiemri@gmail.com"
                  className="w-full border-gray-300"
                />
                {errors.email && <p className="text-red-500 text-sm font-regular mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="password" className="w-full border-gray-300" />
                {errors.password && <p className="text-red-500 text-sm font-regular mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-start py-2">
                <Link to="/recipient"
                  className="text-sm text-orange-500 hover:text-orange-600 hover:underline"
                >
                  Dëshironi të regjistroheni si përfitues?
                </Link>
              </div>

              <Button className="w-full hover:bg-orange-600 text-white">Regjistrohu</Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div >
  );
};

export default Donors;

