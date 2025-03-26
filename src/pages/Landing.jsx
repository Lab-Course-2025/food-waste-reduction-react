"use client"

import { useState } from "react"
import { ArrowDown, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Lphoto from "../assets/Landing-photo.png"

export default function FoodDonationPage() {

  // Handle donation button click
  const handleDonateClick = () => {
    setShowDonationForm(true)
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Handle learn more button click
  const handleLearnMoreClick = () => {
    const processSection = document.getElementById("process-section")
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" })
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[600px] w-full bg-rose-200">
        <img
            src={Lphoto}
            alt="Food donation volunteers"
            className="absolute inset-0 w-full h-full object-cover object-center"
        />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-3xl px-4 text-center">
              <div className="inline-block rounded-lg px-6 py-4">
                <h1 className="text-2xl font-bold text-white md:text-3xl">Së bashku për të ndihmuar tjerët!</h1>
                <p className="mt-2 text-sm text-white">Duke u kujdesur të mos humbim ushqim, ushqejmë të tjerët në nevojë! </p>
              </div>
              <div className="mt-6 flex justify-center gap-4">
              <Link to="/donors">
                <Button className="rounded-md bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600">
                  Regjistrohu si Donator
                </Button>
              </Link>
              <Link to="/recipient">
                <Button className="rounded-md border border-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600">
                  Regjistrohu si Perfitues
                </Button>
              </Link>  
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Donations Section */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <h2 className="py-6 text-center text-2xl font-bold">Donacionet Aktive</h2>

            {/* Scrollable donation container */}
            <div className="max-h-[600px] overflow-y-auto px-4 pb-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div key={item} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="relative h-48 w-full">
                      <img
                        src="https://www.food-safety.com/ext/resources/Newsletters/GettyImages-1225416626.jpg?height=635&t=1616167053&width=1200"
                        alt="Hands holding food"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Pako ushqimi {item}</h3>
                      <p className="mt-1 text-sm text-gray-500">Ushqime të ndryshme për familjet në nevojë</p>
                      <Button
                        onClick={handleDonateClick}
                        className="mt-4 w-full rounded-md bg-orange-500 py-2 font-medium text-white hover:bg-orange-600"
                      >
                        Apliko!
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            {/* <div className="flex justify-center py-4 border-t">
              <Button
                className="rounded-full p-2 hover:bg-gray-100 text-gray-400"
                onClick={() => {
                  const donationContainer = document.querySelector(".overflow-y-auto")
                  if (donationContainer) {
                    donationContainer.scrollBy({
                      top: 300,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process-section" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold">Procesi</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
              <span className="text-2xl text-rose-500">●</span>
            </div>
            <h3 className="mb-2 font-semibold">Zgjidhni Donacionin</h3>
            <p className="text-sm text-gray-600">Zgjidhni llojin e ushqimit që dëshironi të dhuroni</p>
          </div>
          <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="text-2xl text-blue-500">□</span>
            </div>
            <h3 className="mb-2 font-semibold">Mbushni Formularin</h3>
            <p className="text-sm text-gray-600">Plotësoni të dhënat tuaja dhe detajet e donacionit</p>
          </div>
          <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl text-green-500">✦</span>
            </div>
            <h3 className="mb-2 font-semibold">Dorëzimi</h3>
            <p className="text-sm text-gray-600">Dorëzoni ushqimet në pikën e mbledhjes ose kërkoni marrje në shtëpi</p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            onClick={handleLearnMoreClick}
            className="rounded-md bg-orange-500 px-6 py-2 font-medium text-white hover:bg-orange-600"
          >
            Mëso më shumë
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">Disa përvojat e përdoruesve tanë të mrekullueshëm!</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <span className="text-orange-500">●</span>
            </div>
            <div>
              <p className="font-semibold">2,341</p>
              <p className="text-sm text-gray-500">Familje të ndihmuara</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <span className="text-orange-500">●</span>
            </div>
            <div>
              <p className="font-semibold">5,712</p>
              <p className="text-sm text-gray-500">Donacione të përfunduara</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <span className="text-orange-500">●</span>
            </div>
            <div>
              <p className="font-semibold">12,789 kg</p>
              <p className="text-sm text-gray-500">Ushqime të shpërndara</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <button className="rounded-full p-1 hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </button>
          <button className="rounded-full p-1 hover:bg-gray-100">
            <span className="flex h-5 w-5 items-center justify-center text-sm">1</span>
          </button>
          <button className="rounded-full p-1 hover:bg-gray-100">
            <span className="flex h-5 w-5 items-center justify-center text-sm">2</span>
          </button>
          <button className="rounded-full p-1 hover:bg-gray-100">
            <span className="flex h-5 w-5 items-center justify-center text-sm">3</span>
          </button>
          <button className="rounded-full p-1 hover:bg-gray-100">
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

