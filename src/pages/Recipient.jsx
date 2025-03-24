"use client"
import { useState } from "react"
import { Facebook, Twitter, Instagram, Youtube, Globe, Menu, X } from "lucide-react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";


const Recipient = () => {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
            <img
              src="https://www.centraltexasfoodbank.org/sites/default/files/styles/basic_page_hero/public/2020-11/volunteers-in-warehouse-covid2.jpg?itok=U-4LXJvV"
              alt="Food donation volunteers"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Ndihmoni në Shpërndarjen e Ushqimit</h1>
            <p className="max-w-2xl mx-auto mb-6 text-sm md:text-base">
              Bashkohu me ne për të reduktuar mbetjet ushqimore dhe për të mbështetur komunitetet lokale.
            </p>
            <Button className="hover:bg-orange-600 text-white rounded-md px-6">
              Bëhu vullnetar sot!
            </Button>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12 px-4">
          <div className="max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
            <h2 className="text-xl font-bold text-center mb-8">Forma e Regjistrimit të Përfituesve</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium mb-1">
                  Emri dhe Mbiemri
                </label>
                <Input id="identifier" placeholder="Emri i familjes" className="w-full border-gray-300" />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Numri i telefonit
                </label>
                <Input id="name" placeholder="+355 69 XXX XXXX" className="w-full border-gray-300" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="emri.mbiemri@gmail.com"
                  className="w-full border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input id="password" type="password" placeholder="password" className="w-full border-gray-300" />
              </div>

              <div className="flex items-start py-2">
                <a
                  href="/donator-registration"
                  className="text-sm text-orange-500 hover:text-orange-600 hover:underline"
                >
                  Deshironi te regjistroheni si donator?
                </a>
              </div>

              <Button className="w-full hover:bg-orange-600 text-white">Regjistrohu</Button>
            </form>
          </div>
        </section>

        {/* Newsletter */}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Recipient;