"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, LogIn} from "lucide-react"
import logo from "../assets/logo.png"

const Header = () => {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (

    <header className="border-b fixed top-0 left-0 w-full z-50 bg-white py-3 px-4 md:px-8">
      <div className="container mx-auto flex items-center relative p-1">
        {/* Logo - Left */}
        <div className="absolute left-0 flex items-center gap-2">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/" className="font-bold text-black">

            Ndihmo Tjetrin
          </Link>
        </div>

        {/* Desktop Navigation - Dead Center */}
        <div className="hidden md:flex w-full justify-center">
          <nav className="flex items-center space-x-6 text-sm text-black font-semibold">
            <Link to="/" className="hover:text-[#FF4C00FF] transition-colors duration-200">Kryefaqja</Link>
            <Link to="/information" className="hover:text-[#FF4C00FF] transition-colors duration-200">Informata</Link>
            <Link to="/donors" className="hover:text-[#FF4C00FF] transition-colors duration-200">Regjistrimi si Donator</Link>
            <Link to="/recipient" className="hover:text-[#FF4C00FF] transition-colors duration-200">Regjistrimi si Perfitues</Link>
            <Link to="/contact-us" className="hover:text-[#FF4C00FF] transition-colors duration-200">Kontakt</Link>
          </nav>
        </div>

        {/* Login - Right */}
        <div className="absolute right-0 hidden md:block">
          <Link to="/login" className="text-black font-semibold text-sm hover:text-[#FF4C00FF] transition-colors duration-200 flex items-center gap-2">
          <LogIn className="w-6 h-6"/>
            Kyqu
          </Link>
        </div>

        {/* Mobile Menu button */}
        <div className="ml-auto md:hidden">
          <button className="text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}

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
            <Link
              to="/login"
              className="py-2 px-4 text-white bg-[#FF4C00FF] hover:bg-blue-700 rounded-md text-center font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kyqu
            </Link>

          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

