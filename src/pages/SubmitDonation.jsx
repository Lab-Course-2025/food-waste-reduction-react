"use client"

import { useState } from "react"
import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft, Camera } from "lucide-react"

export default function FoodDonationForm() {
  const [formData, setFormData] = useState({
    donationName: "",
    foodCategory: "",
    expirationDate: "",
    transportAddress: "",
    transportDate: "",
    transportTime: "",
    additionalNotes: "",
    photo: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file), // Store the preview URL
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      {/* Top Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <button className="cursor-pointer">
            <ArrowLeft className="mr-3" size={20} />
          </button>
          <span className="text-base font-medium">Add New Food Donation</span>
        </div>
      </div>

      {/* Main Content Area - centered with flex */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6">
        {/* Form Card with Border and Shadow */}
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-6">
              {/* Donation Details Section */}
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3">Detajet e Donacionit</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Emri i Donacionit</label>
                      <Input
                        name="donationName"
                        value={formData.donationName}
                        onChange={handleInputChange}
                        placeholder="Fut Emrin e Donacionit"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Kategoria e Ushqimit</label>
                      <Input
                        name="foodCategory"
                        value={formData.foodCategory}
                        onChange={handleInputChange}
                        placeholder="Fut Kategorinë e Donacionit"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Expiration Date</label>
                      <Input
                        name="expirationDate"
                        type="date"
                        value={formData.expirationDate}
                        onChange={handleInputChange}
                        placeholder="Fut Datën e Skadencës"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details Section */}
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3">Detajet e Aplikimit</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Adresa për Transport</label>
                    <Input
                      name="transportAddress"
                      value={formData.transportAddress}
                      onChange={handleInputChange}
                      placeholder="Fut Emrin e Donacionit"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Data për Transport</label>
                    <Input
                      name="transportDate"
                      type="date"
                      value={formData.transportDate}
                      onChange={handleInputChange}
                      placeholder="Fut Datën për Transport"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Koha për Transport</label>
                    <Input
                      name="transportTime"
                      type="time"
                      value={formData.transportTime}
                      onChange={handleInputChange}
                      placeholder="Fut Kohën për Transport"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes Section */}
              <div>
                <label className="block text-sm mb-1">Shkrime shtesë</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Furnizoni një shënim ose udhëzim rreth donacionit apo ushqimit"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  rows={4}
                />
              </div>
            </div>

            {/* Form Actions */}
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
  )
}

