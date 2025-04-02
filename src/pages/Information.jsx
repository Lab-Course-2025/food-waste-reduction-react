import React from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import IPhoto from "../assets/information-photo.png";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Title */}
      <main className="max-w-5xl mx-auto px-4 py-8 pt-[80px] flex-grow">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-6">Rëndësia e Reduktimit të Humbjeve Ushqimore.</h1>

          <p className="text-sm mb-4 text-gray-700">
            Humbja ushqimore nuk është vetëm një çështje mjedisore; ato përbëjnë një problem kompleks me pasoja të gjera për shoqërinë,
            ekonominë dhe mirëqenien tonë. Duke kuptuar rëndësinë e reduktimit të mbetjeve ushqimore, mund të ndërmarrim hapa domethënës për të adresuar këtë sfidë urgjente.

          </p>

          <p className="text-sm mb-4 text-gray-700">
            Së pari, trajtimi i humbjeve ushqimore është thelbësor për qëndrueshmërinë mjedisore. Kur ushqimi hidhet, jo vetëm që shpërdorohen burimet e përdorura për prodhimin e tij,
            por gjithashtu kontribuon në emetimet e gazrave serrë kur dekompozohet në landfille.
          </p>

          <p className="text-sm mb-4 text-gray-700">
            Së dyti, reduktimi i humbjeve ushqimore ka ndikime të rëndësishme ekonomike. Ai mund të kursejë para për individët dhe familjet,
            si dhe të zvogëlojë barrën ekonomike për bizneset dhe qeveritë lokale.
          </p>

          <p className="text-sm mb-4 text-gray-700">
            Për më tepër, nga një këndvështrim social, reduktimi i humjeve ushqimore mund të kontribuojë në sigurinë ushqimore dhe në uljen e urisë. Duke u edukuar dhe duke ndërmarrë veprime,
            mund të krijojmë një botë më të qëndrueshme dhe më të drejtë.
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Karakteristikat & Benefitet</h2>

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
                    <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Reduktimi i Mbetjeve Ushqimore</h3>
              <p className="text-sm text-gray-600">
                Ne punojmë në mënyrë të vazhdueshme për të reduktuar mbetjet ushqimore dhe për të përmirësuar praktikat e
                qëndrueshmërisë.
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
                    <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Forcimi i Komuniketit dhe Solidaritetit</h3>
              <p className="text-sm text-gray-600">
                Ne punojmë për të forcuar lidhjet në komunitet dhe për të promovuar solidaritetin përmes ndarjes së
                ushqimit.
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
                    <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Përmirësimi i Sigurisë Ushqimore</h3>
              <p className="text-sm text-gray-600">
                Siguria ushqimore është prioriteti ynë kryesor dhe ne punojmë për të garantuar cilësinë e produkteve.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-16">
          <h3 className="text-center mb-8 text-lg">
            A e dini se reduktimi i humbjeve ushqimore mund të ketë një efekt zinxhir, duke përfituar jo vetëm komunitetin
            tonë, por edhe mjedisin tonë?
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">28%</p>
              <p className="text-sm text-gray-600 mt-2">
                E ushqimit të prodhuar në botë humbet ose shpërdorohet çdo vit, duke ndikuar negativisht në mjedis.
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">4x</p>
              <p className="text-sm text-gray-600 mt-2">
                Më shumë ushqim mund të shpëtohet nëse të gjithë marrim pjesë në reduktimin e humbjeve.
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">7%</p>
              <p className="text-sm text-gray-600 mt-2">
                E emetimeve të gazrave serrë vijnë nga humbjet dhe mbetjet ushqimore në nivel global.
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">15%</p>
              <p className="text-sm text-gray-600 mt-2">
                Reduktimi i humbjeve ushqimore mund të ulë ndjeshëm emetimet e karbonit dhe të përmirësojë sigurinë
                ushqimore.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
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

        {/* Call to Action */}
        <section className="grid md:grid-cols-2 overflow-hidden rounded-lg">
          <div className="bg-orange-600 text-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Bashkohuni kundër humbjes së ushqimit!</h2>
            <p className="text-sm mb-6">
              Nëse vazhdojmë të punojmë së bashku, mund të krijojmë një komunitet më të qëndrueshëm dhe të reduktojmë
              humbjet ushqimore.
            </p>
            <Button className="bg-white text-orange-500">Regjistrohuni Falas!</Button>
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

export default LandingPage;

