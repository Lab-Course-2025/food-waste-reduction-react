import { useState, useEffect, useRef } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Lphoto from "../assets/Landing-photo.png";
import axios from "axios";

export default function FoodDonationPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const modalRef = useRef(null);

  const [donations, setDonations] = useState([]);
  // Handle donation button click
  const handleDonateClick = () => {
    setShowDonationForm(true);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLoginModal(false);
      }
    };

    if (showLoginModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginModal]);

  useEffect(() => {
    const fetchFirstThreeDonations = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(`${apiUrl}/food-listings`, {
          params: {
            statuses: ['active', 'in-wait']
          }
        });
        console.log(response.data.data);
        setDonations(response.data.data);
      } catch (error) {
        console.error("Error fetching top donations:", error);
      }
    };

    fetchFirstThreeDonations();
  }, []);

  // Handle learn more button click
  const handleLearnMoreClick = () => {
    const processSection = document.getElementById("process-section");
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
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
                  <Button>
                    Regjistrohu si Donator
                  </Button>
                </Link>
                <Link to="/recipient">
                  <Button>
                    Regjistrohu si Perfitues
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Donations Section */}
      {/* Active Donations Section */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <h2 className="py-6 text-center text-2xl font-bold">Donacionet Aktive</h2>

            {/* Scrollable donation container */}
            <div className="px-4 pb-6">
              {donations.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-lg">
                  Nuk ka donacione aktive
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {donations.slice(0, 3).map((donation, index) => (
                    <Link
                      to={`/donations/${donation.id}`}
                      key={donation.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-[250px] w-full">
                        <img
                          src={
                            donation.image_url ||
                            "https://finegrocery.in/wp-content/uploads/2021/05/finegrocery-place-holder-2.jpg"
                          }
                          alt={donation.name || "Donacion"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-5 grow">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {donation.name || "Pako Ushqimi"}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {donation.notes || "Ushqime për familjet në nevojë"}
                          </p>
                          <div className="mt-3 text-sm text-gray-500 space-y-1">
                            <p>
                              <span className="font-medium text-gray-700">Kompania:</span>{" "}
                              {donation.donor.business_name || "Kompani e panjohur"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Kategoria:</span>{" "}
                              {donation.category?.name || "Ushqim"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Adresa:</span>{" "}
                              {donation.address || "Nuk ka rrugë"}
                            </p>
                            <p>
                              <span className="font-medium text-gray-700">Qyteti:</span>{" "}
                              {donation.city?.name || "Nuk ka qyetet"}
                            </p>
                            {donation.expiration_date && (
                              <p>
                                <span className="font-medium text-gray-700">Skadon më:</span>{" "}
                                {new Date(donation.expiration_date).toLocaleDateString()}
                              </p>
                            )}
                            <p>
                              <span className="font-medium text-gray-700">Sasia:</span>{" "}
                              {donation.quantity && donation.unit_of_measurement
                                ? `${donation.quantity} ${donation.unit_of_measurement}`
                                : "E panjohur"
                              }
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                          {donation.status === 'in-wait' ? (
                            <p className="text-center text-sm text-yellow-600 font-medium">
                              Ky donacion është në proces të pranimit
                            </p>
                          ) : (
                            <Button
                              className="flex-1 rounded-lg py-2 text-sm text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isAuthenticated()) {
                                  handleDonateClick(donation);
                                } else {
                                  setShowLoginModal(true);
                                }
                              }}
                            >
                              Apliko
                            </Button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Trego më shumë button */}
            {donations.length > 0 && (
              <div className="flex justify-center py-4 border-t">
                <Link to="/active-donations">
                  <Button>Trego Më Shumë</Button>
                </Link>
              </div>
            )}
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
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
          <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Për të aplikuar duhet të jeni të kyçur si përfitues</h2>
            <div className="flex justify-center gap-4 mt-6">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => navigate("/login")}
              >
                Kyçu
              </Button>
              <Button
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => navigate("/recipient")}
              >
                Krijo llogari
              </Button>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

