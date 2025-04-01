"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, Check, User, ChevronDown } from "lucide-react"
import  Button  from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import  Input  from "../components/Input"
import logo from "../assets/logo.png"

export default function DonationApplication() {
  const [selectedTime, setSelectedTime] = useState("4:00 PM - 4:30 PM")
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
          <Link to="/recipient">
          <button className="cursor-pointer">
            <ArrowLeft className="mr-3 mt-2" size={20} />
          </button>
          </Link>
          <span className="text-base font-medium">Apliko per Donacion</span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-4 py-4 px-8 gap-6 mb-8 bg-white">
        {/* Left column - Image */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center">
            <img
              src={logo}
              alt="Food donation box"
              className="h-40 object-contain"
            />
          </div>
        </div>

        {/* Right column - Donation details */}
        <div className="md:col-span-3">
          {/* Status */}
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">I disponueshëm</span>
            <span className="text-gray-500 text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Postuar para 2 orësh
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold mb-2">Pemë dhe Perime të Freskëta</h1>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Mitrovicë</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">
            Pako ushqimore që përmban pemë dhe perime të freskëta, për të ushqyer 10 familje.
          </p>

          {/* Donor info */}
          <div className="flex items-center">
            <div className="bg-red-500 rounded-full p-2 mr-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium">Kompania XYZ</div>
              <div className="text-sm text-gray-500">Donator i Verifikuar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[90%] md:w-3/4 py-4 px-4 md:px-6 m-2 bg-gray-200 shadow-sm overflow-hidden rounded">
        {/* Application form section header */}
        <div className="border-t pt-6 mb-6">
          <h3 className="font-medium">Detajet e Aplikimit</h3>
        </div>

        {/* Form fields */}
        <div className="space-y-6 px-4">
          {/* Organization name */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Emri i Organizatës Tuaj</label>
            <Input placeholder="Emri i Organizatës Tuaj" className="bg-gray-50 border-gray-200" />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Qëllimi i Përfitimit</label>
            <textarea
              placeholder="Shpjegoni pse duhet ta përfitoni këtë donacion"
              className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Preferred time */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Koha e preferuar për ta marrur</label>
            <div className="relative">
              <div
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3 cursor-pointer"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              >
                <span>{selectedTime}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              {showTimeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div
                    className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      setSelectedTime("4:00 PM - 4:30 PM")
                      setShowTimeDropdown(false)
                    }}
                  >
                    <span>4:00 PM - 4:30 PM</span>
                    {selectedTime === "4:00 PM - 4:30 PM" && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                  <div
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedTime("4:30 PM - 5:00 PM")
                      setShowTimeDropdown(false)
                    }}
                  >
                    <span>4:30 PM - 5:00 PM</span>
                  </div>
                  <div
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedTime("5:00 PM - 5:30 PM")
                      setShowTimeDropdown(false)
                    }}
                  >
                    <span>5:00 PM - 5:30 PM</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact number */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Numri Kontaktues</label>
            <Input placeholder="Futni Numrin Kontaktues" className="bg-gray-50 border-gray-200" type="tel" />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="w-full flex justify-center py-4 mt-5 bg-white">
        <Button className="w-3/4 bg-red-600 hover:bg-red-700 text-white py-6">
          Dërgo Aplikimin
        </Button>
      </div>
    </div>
  )
}

