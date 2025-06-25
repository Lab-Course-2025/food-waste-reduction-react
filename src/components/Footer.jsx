import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logo from "../assets/logo.png";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError("Ju lutem shkruani emailin tuaj");
      return;
    }

    try {
      setError("");
      setMessage("");

      const apiUrl = import.meta.env.VITE_API_URL;


      const response = await axios.post(`${apiUrl}/subscribe`, {
        email,
      });

      toast.success(response.data.message || "Faleminderit për abonimin!");
      setEmail(""); setEmail("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Dështoi abonimi.");
      } else {
        setError("Gabim në rrjet.");
      }
    }
  };
  return (
    <>
      {/* Newsletter Subscription */}
      <section className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-medium mb-4">Abonohu në Buletinin Informativ</h3>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(""); // Clear the error when the user starts typing
              }}
              placeholder="Email juaj këtu"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button onClick={handleSubscribe}>Abonohu</Button>
          </div>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-900 text-white py-8 px-4 md:px-50" >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={logo} alt="Logo" className="h-8" />
              <span className="font-bold">Ndihmo Tjetrin</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <Link
                to="/information"
                className="text-sm text-gray-400"
              >
                Rreth Nesh
              </Link>
              <Link
                to="/active-donations"
                className="text-sm text-gray-400"
              >
                Donacionet
              </Link>
              <Link
                to="/contact-us"
                className="text-sm text-gray-400"
              >
                Na kontaktoni
              </Link>
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
              <a href="https://www.facebook.com/uibm02/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook">

                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/uibm_net/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@universitetiisaboletini-mi6352"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer >
    </>

  );
};

export default Footer;
