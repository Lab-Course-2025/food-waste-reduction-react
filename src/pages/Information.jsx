import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import IPhoto from "../assets/information-photo.png";

const StatisticsSection = () => {
  const stats = [
    { id: 1, value: 28, suffix: "%", description: "E ushqimit të prodhuar në botë humbet ose shpërdorohet çdo vit, duke ndikuar negativisht në mjedis." },
    { id: 2, value: 4, suffix: "x", description: "Më shumë ushqim mund të shpëtohet nëse të gjithë marrim pjesë në reduktimin e humbjeve." },
    { id: 3, value: 7, suffix: "%", description: "E emetimeve të gazrave serrë vijnë nga humbjet dhe mbetjet ushqimore në nivel global." },
    { id: 4, value: 15, suffix: "%", description: "Reduktimi i humbjeve ushqimore mund të ulë ndjeshëm emetimet e karbonit dhe të përmirësojë sigurinë ushqimore." },
  ];

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="mb-16" ref={sectionRef}>
      <h3 className="text-center mb-8 text-lg">
        A e dini se reduktimi i humbjeve ushqimore mund të ketë një efekt
        zinxhir, duke përfituar jo vetëm komunitetin tonë, por edhe
        mjedisin tonë?
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              {visible ? <Counter target={stat.value} suffix={stat.suffix} /> : "0"}
            </p>
            <p className="text-sm text-gray-600 mt-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // Animation duration in milliseconds
    const increment = target / (duration / 16); // Increment per frame (assuming ~60fps)

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

const Information = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;

  const testimonials = [
    { id: 1, value: "2,341", label: "Familje të ndihmuara" },
    { id: 2, value: "5,712", label: "Donacione të përfunduara" },
    { id: 3, value: "12,789 kg", label: "Ushqime të shpërndara" },
    { id: 4, value: "8,123", label: "Vullnetarë të angazhuar" },
    { id: 5, value: "15,000+", label: "Orë pune të kursyera" },
    { id: 6, value: "20%", label: "Reduktim i mbetjeve ushqimore" },
  ];

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const currentTestimonials = testimonials.slice(
    (currentPage - 1) * testimonialsPerPage,
    currentPage * testimonialsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Title */}
      <main className="max-w-5xl mx-auto px-4 py-8 pt-[80px] flex-grow">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-6">
            Rëndësia e Reduktimit të Humbjeve Ushqimore.
          </h1>

          <p className="text-sm mb-4 text-gray-700">
            Humbja ushqimore nuk është vetëm një çështje mjedisore; ato përbëjnë
            një problem kompleks me pasoja të gjera për shoqërinë, ekonominë dhe
            mirëqenien tonë. Duke kuptuar rëndësinë e reduktimit të mbetjeve
            ushqimore, mund të ndërmarrim hapa domethënës për të adresuar këtë
            sfidë urgjente.
          </p>

          <p className="text-sm mb-4 text-gray-700">
            Së pari, trajtimi i humbjeve ushqimore është thelbësor për
            qëndrueshmërinë mjedisore. Kur ushqimi hidhet, jo vetëm që
            shpërdorohen burimet e përdorura për prodhimin e tij, por gjithashtu
            kontribuon në emetimet e gazrave serrë kur dekompozohet në
            landfille.
          </p>

          <p className="text-sm mb-4 text-gray-700">
            Së dyti, reduktimi i humbjeve ushqimore ka ndikime të rëndësishme
            ekonomike. Ai mund të kursejë para për individët dhe familjet, si
            dhe të zvogëlojë barrën ekonomike për bizneset dhe qeveritë lokale.
          </p>

          <p className="text-sm mb-4 text-gray-700">
            Për më tepër, nga një këndvështrim social, reduktimi i humjeve
            ushqimore mund të kontribuojë në sigurinë ushqimore dhe në uljen e
            urisë. Duke u edukuar dhe duke ndërmarrë veprime, mund të krijojmë
            një botë më të qëndrueshme dhe më të drejtë.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">
            Karakteristikat & Benefitet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-orange-500"
                  >
                    <rect
                      width="24"
                      height="24"
                      rx="12"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M12 6V18M6 12H18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Reduktimi i Mbetjeve Ushqimore</h3>
              <p className="text-sm text-gray-600">
                Ne punojmë në mënyrë të vazhdueshme për të reduktuar mbetjet
                ushqimore dhe për të përmirësuar praktikat e qëndrueshmërisë.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-orange-500"
                  >
                    <rect
                      width="24"
                      height="24"
                      rx="12"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M12 6V18M6 12H18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">
                Forcimi i Komuniketit dhe Solidaritetit
              </h3>
              <p className="text-sm text-gray-600">
                Ne punojmë për të forcuar lidhjet në komunitet dhe për të
                promovuar solidaritetin përmes ndarjes së ushqimit.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-orange-500"
                  >
                    <rect
                      width="24"
                      height="24"
                      rx="12"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M12 6V18M6 12H18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Përmirësimi i Sigurisë Ushqimore</h3>
              <p className="text-sm text-gray-600">
                Siguria ushqimore është prioriteti ynë kryesor dhe ne punojmë
                për të garantuar cilësinë e produkteve.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Testimonials Section */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Disa përvojat e përdoruesve tanë të mrekullueshëm!
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {currentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-orange-500">●</span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.value}</p>
                  <p className="text-sm text-gray-500">{testimonial.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`rounded-full p-1 ${currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                <span className="flex h-5 w-5 items-center justify-center text-sm">
                  {index + 1}
                </span>
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer" />
            </button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="grid md:grid-cols-2 overflow-hidden rounded-lg">
          <div className="bg-orange-600 text-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">
              Bashkohuni kundër humbjes së ushqimit!
            </h2>
            <p className="text-sm mb-6">
              Nëse vazhdojmë të punojmë së bashku, mund të krijojmë një
              komunitet më të qëndrueshëm dhe të reduktojmë humbjet ushqimore.
            </p>
            <div className="w-full">
              <Link to="/donors" className="block w-full">
                <Button className="w-full bg-orange border border-white text-orange-500">
                  Regjistrohuni Falas!
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-200">
            <img
              src={IPhoto}
              alt="People collaborating"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Information;
