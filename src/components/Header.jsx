"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import logo from "../assets/logo.png";
import NavLink from "../components/NavLink";

const Header = () => {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // For controlling menu visibility with smooth transition
  const isActive = (path) => location.pathname === path ? "text-[#FF4C00FF]" : "text-black"
  const navigate = useNavigate();

  // Trigger smooth visibility change when mobile menu opens or closes
  useEffect(() => {
    if (mobileMenuOpen) {
      setIsMenuVisible(true); // Show the menu after a short delay to trigger the animation
    } else {
      setIsMenuVisible(false); // Hide the menu smoothly
    }
  }, [mobileMenuOpen]);

  return (
    <header className="border-b-1 fixed top-0 left-0 w-full z-50 bg-white py-3 px-4 md:px-8">
      <div className="container mx-auto flex items-center relative p-1">
        {/* Logo - Left */}
        <div className="absolute left-0 flex items-center gap-2">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
          <Link to="/" className="font-bold text-black hidden lg:inline">
            Ndihmo Tjetrin
          </Link>

        </div>

        {/* Desktop Navigation - Dead Center */}
        <div className="hidden md:flex w-full justify-center">
          <nav className="flex items-center space-x-6 text-sm text-black font-medium">
            <NavLink to="/" className="hover:text-[#FF4C00FF] transition-colors duration-200">
              Kryefaqja
            </NavLink>
            <NavLink to="/information" className="hover:text-[#FF4C00FF] transition-colors duration-200">
              Informata
            </NavLink>
            <NavLink to="/donors" className="hover:text-[#FF4C00FF] transition-colors duration-200">
              Regjistrimi si Donator
            </NavLink>
            <NavLink to="/recipient" className="hover:text-[#FF4C00FF] transition-colors duration-200">
              Regjistrimi si Perfitues
            </NavLink>
            <NavLink to="/contact-us" className="hover:text-[#FF4C00FF] transition-colors duration-200">
              Kontakt
            </NavLink>
          </nav>
        </div>

        {/* Login - Right */}
        <div className="absolute right-0 hidden md:block">
          <Link
            to="/login"
            className="text-black font-semibold text-sm hover:text-[#FF4C00FF] transition-colors duration-200 flex items-center gap-2"
          >
            <span className="hidden lg:inline">Kyqu</span>
            <LogIn className="w-6 h-6" />
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
        <div
          className={`absolute top-0 left-0 w-full bg-white border-t shadow-lg md:hidden mt-6.5 py-3 px-4 overflow-hidden transition-all duration-700 ease-in-out transform ${
            isMenuVisible
              ? "max-h-[500px] opacity-100 translate-y-10"
              : "max-h-0 opacity-0 translate-y-10"
          }`}
        >
          <nav className="flex flex-col space-y-3 text-sm">
            <Link to="/" className={`${isActive("/")} py-1`} onClick={() => setMobileMenuOpen(false)}>
              Kryefaqja
            </Link>
            <Link to="/information" className={`${isActive("/information")} py-1`} onClick={() => setMobileMenuOpen(false)}>
              Informata
            </Link>
            <Link to="/donors" className={`${isActive("/donors")} py-1`} onClick={() => setMobileMenuOpen(false)}>
              Regjistrimi si Donator
            </Link>
            <Link to="/recipient" className={`${isActive("/recipient")} py-1`} onClick={() => setMobileMenuOpen(false)}>
              Regjistrimi si Perfitues
            </Link>
            <Link to="/contact-us" className={`${isActive("/contact-us")} py-1`} onClick={() => setMobileMenuOpen(false)}>
              Kontakt
            </Link>
            <Link
              to="/login"
              className="py-2 px-4 text-white bg-[#FF4C00FF] rounded-md text-center font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kyqu
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
