"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import logo from "../assets/logo.png"

const Header = () => {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="border-b fixed top-0 left-0 w-full z-50 bg-white py-3 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/" className="font-bold text-black">
            Ndihmo Tjetrin
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm text-black font-semibold">
          <Link to="/">Kryefaqja</Link>
          <Link to="/information">Informata</Link>
          <Link to="/donors">Regjistrimi si Donator</Link>
          <Link to="/recipient">Regjistrimi si Perfitues</Link>
          <Link to="/contact-us">Kontakt</Link>
        </nav>

        {/* Mobile Menu button */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")} className="text-black font-semibold cursor-pointer">
            Kyqu
          </button>
          <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-3 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-3 text-sm text-gray-600">
            <Link to="/" className="py-1" onClick={() => setMobileMenuOpen(false)}>
              Kryefaqja
            </Link>
            <Link to="/information" className="py-1" onClick={() => setMobileMenuOpen(false)}>
              Informata
            </Link>
            <Link to="/donors" className="py-1" onClick={() => setMobileMenuOpen(false)}>
              Regjistrimi si Donator
            </Link>
            <Link to="/recipient" className="py-1" onClick={() => setMobileMenuOpen(false)}>
              Regjistrimi si Perfitues
            </Link>
            <Link to="/contact-us" className="py-1" onClick={() => setMobileMenuOpen(false)}>
              Kontakt
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

