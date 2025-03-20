"use client"

import { useState } from "react"
import { Facebook, Twitter, Instagram, Youtube, Globe, Menu, X } from "lucide-react"

// Replacing Next.js components with standard components
const Button = ({ children, className, variant, size, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant || "default"]} ${sizeClasses[size || "default"]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  )
}

export default function Recipient() {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b py-3 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">👋</span>
            <a href="/" className="font-bold text-gray-800">
              Ndihmo Tjetrin
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm text-gray-600 bold">
            <a href="#">Kryefaqja</a>
            <a href="#">Donacionet</a>
            <a href="#">Regjistro një Familje</a>
            <a href="#">Regjistro një Biznes</a>
            <a href="#">Kontakt</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Globe className="h-4 w-4 mr-1" />
              Shqip
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-4 bg-white border-t">
            <nav className="flex flex-col space-y-3 text-sm text-gray-600">
              <a href="#" className="py-1">
                Kryefaqja
              </a>
              <a href="#" className="py-1">
                Donacionet
              </a>
              <a href="#" className="py-1">
                Regjistro një Familje
              </a>
              <a href="#" className="py-1">
                Regjistro një Biznes
              </a>
              <a href="#" className="py-1">
                Kontakt
              </a>
            </nav>
          </div>
        )}
      </header>

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
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 cursor-pointer">
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

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Regjistrohu</Button>
            </form>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-medium mb-4">Abonohu në Buletinin Informativ</h3>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <Input placeholder="Email juaj këtu" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Abonohu</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-yellow-500 text-xl">👋</span>
              <span className="font-bold">Ndihmo Tjetrin</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <a href="#">Rreth Nesh</a>
              <a href="#">Donacionet</a>
              <a href="#">Qendrat e ndihmave</a>
              <a href="#">Na kontaktoni</a>
              <a href="#">FAQs</a>
              <a href="#">Karriera</a>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-800 text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1">
                <option>Shqip</option>
              </select>
            </div>
            <div className="mb-4 md:mb-0">© 2025 Ndihmo Tjetrin</div>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

