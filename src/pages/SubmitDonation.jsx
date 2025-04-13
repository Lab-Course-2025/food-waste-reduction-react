import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { ArrowLeft, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const cities = [
  "Prishtinë", "Prizren", "Pejë", "Gjakovë", "Mitrovicë", "Ferizaj", "Gjilan",
  "Vushtrri", "Podujevë", "Suharekë", "Rahovec", "Malishevë", "Drenas",
  "Lipjan", "Kamenicë", "Skenderaj", "Deçan", "Istog", "Dragash", "Kaçanik",
  "Shtime", "Fushë Kosovë", "Obiliq", "Klinë", "Novobërdë"
];

export default function FoodDonationForm() {
  const [formData, setFormData] = useState({
    donationName: "",
    foodCategory: "",
    expirationDate: "",
    isCooked: "raw", // "cooked" or "raw"
    packagingStatus: "",
    transportAddress: "",
    transportDate: "",
    transportTime: "",
    additionalNotes: "",
    photo: null,
    address: {
      street: "",
      postcode: "",
      city: "",
      country: "Kosova", // Default value since it's fixed
    }
  });
  const [errors, setErrors] = useState({});


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

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Send to Laravel API
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <Link to="/donors">
            <button className="cursor-pointer">
              <ArrowLeft className="mr-3 mt-2" size={20} />
            </button>
          </Link>
          <span className="text-base font-medium">Add New Food Donation</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-6">
              {/* Donation Details */}
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3">Detajet e Donacionit</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 h-60 bg-gray-50 shadow-lg">
                    {formData.photoPreview ? (
                      <img src={formData.photoPreview} alt="Preview" className="h-full w-full object-cover rounded-md" />
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
                        name="donationName"
                        value={formData.donationName}
                        onChange={handleChange}
                        placeholder="P.sh. Bukë e freskët, Fruta"
                        className="w-full border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Kategoria e Ushqimit</label>
                      <select
                        name="foodCategory"
                        value={formData.foodCategory}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${formData.address.city === "" ? "text-gray-500" : "text-black"
                          }`}
                      >
                        <option value="">Zgjedh një kategori</option>
                        <option value="Bakery">Bukë / Brumëra</option>
                        <option value="Fruits">Fruta</option>
                        <option value="Vegetables">Perime</option>
                        <option value="Cooked">Gatim i gatuar</option>
                        <option value="Dairy">Produkte të qumështit</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Data e Skadencës</label>
                      <Input
                        name="expirationDate"
                        type="date"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        className="w-full border-gray-300"
                      />
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
                    <label htmlFor="street" className="block text-sm font-medium mb-1">Rruga</label>
                    <Input
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      placeholder="P.sh. Rr. Bulevardi Bill Clinton"
                      className="w-full border-gray-300"
                    />
                    {errors["address.street"] && <p className="text-red-500 text-sm mt-1">{errors["address.street"]}</p>}
                  </div>

                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium mb-1">Kodi Postar</label>
                    <Input
                      name="address.postcode"
                      value={formData.address.postcode}
                      onChange={handleChange}
                      placeholder="40000"
                      className="w-full border-gray-300"
                    />
                    {errors["address.postcode"] && <p className="text-red-500 text-sm mt-1">{errors["address.postcode"]}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">Qyteti</label>
                    <select
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${formData.address.city === "" ? "text-gray-500" : "text-black"
                        }`}
                    >
                      <option className="text-gray-400" value="" disabled>Zgjedh qytetin</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors["address.city"] && <p className="text-red-500 text-sm mt-1">{errors["address.city"]}</p>}
                  </div>
                </div>
              </div>


              {/* Notes */}
              <div>
                <label className="block text-sm mb-1">Shkrime shtesë</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
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
                className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-6 w-1/2 mr-2.5"
                onClick={() => console.log("Cancel clicked")}
              >
                Anulo
              </Button>

              <Button type="submit" className="bg-orange-600 text-white hover:bg-orange-700 px-6 w-1/2 ml-2.5">
                Dërgo
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
