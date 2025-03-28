import { useState } from "react";
import { ArrowDown } from "lucide-react";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowLeft, Camera } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function DonacionetAktive() {
  const [showDonationForm, setShowDonationForm] = useState(false); // Fixed missing state

  const handleDonateClick = () => {
    setShowDonationForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLearnMoreClick = () => {
    const processSection = document.getElementById("process-section");
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-1">
        {/* Header */}
    <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
        <Link to="/">
        <button className="cursor-pointer">
            <ArrowLeft className="mr-3 mt-2" size={20} />
        </button>
        </Link>
        <span className="text-base font-medium">Donactionet Aktive</span>
        </div>
    </div>
      <div className="mx-auto max-w-6xl px-4 md:px-6 m-10">
        <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
          <h2 className="py-6 text-center text-2xl font-bold">Donacionet Aktive</h2>

          {/* Scrollable donation container */}
          <div className="max-h-[600px] overflow-y-auto px-4 pb-6 [&::-webkit-scrollbar]:hidden scrollbar-none">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                  <div className="relative h-48 w-full">
                    <img
                      src="https://www.food-safety.com/ext/resources/Newsletters/GettyImages-1225416626.jpg?height=635&t=1616167053&width=1200"
                      alt="Hands holding food"
                      className="w-full h-full object-cover" // Fixed the fill issue
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
        </div>
      </div>
    </section>
  );
}
