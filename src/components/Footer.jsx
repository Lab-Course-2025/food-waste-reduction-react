import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      {/* Newsletter Subscription */}
      <section className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-medium mb-4">Abonohu në Buletinin Informativ</h3>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email juaj këtu"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
              Abonohu
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={logo} alt="Logo" className="h-8" />
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
    </>
  );
};

export default Footer;
