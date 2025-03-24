import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Globe, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";


const Header = () => {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className=" border-b fixed top-0 left-0 w-full z-50 bg-white py-3 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Replace heart emoji with logo */}
          <img src={logo} alt="Logo" className="h-8" /> {/* Adjust the size of the logo */}
          <a href="/" className="font-bold text-black">

            Ndihmo Tjetrin
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm text-black font-semibold">
          <a href="#">Kryefaqja</a>
          <a href="#">Informata</a>
          <a href="#">Regjistrimi si Donator</a>
          <a href="#">Regjistrimi si Perfitues</a>
          <a href="#">Kontakt</a>
        </nav>

        {/* Mobile Menu button */}
        <div className="flex items-center gap-2">
          <button variant="ghost" size="sm" className="text-black font-semibold">
            <a href="#">Kyqu</a>
          </button>
          <button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}

          </button>
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
  );
};

export default Header;


