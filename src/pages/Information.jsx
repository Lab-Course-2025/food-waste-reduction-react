import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import Iphoto from "./../assets/information-photo.png";

const LandingPage = () => {
  return (
    <div>
        <Header />
        <main className="flex-1">
        {/* Hero Section */}
            <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-center min-h-screen">
              <div className="shadow-2xl w-full max-w-[1176px] h-[620px] bg-[#ff4c00] rounded-2xl overflow-hidden flex">
                {/* Left Side Content */}
                <div className="bg-orange-500 text-white p-8 md:p-12 md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6">Bashkohuni kundër humbjes së ushqimit!</h2>
                  <p className="mb-8 text-lg">
                    Merr veprime sot dhe bëhu pjesë e një komuniteti global të angazhuar për reduktimin e mbetjeve
                    ushqimore. Regjistrohu tani si donator për të ndihmuar si mund të bësh ndryshim.
                  </p>
                  <Button className="bg-white text-orange-500 hover:bg-orange-100 py-2 px-6 rounded-md transition duration-300">
                    Regjistrohu falas
                  </Button>
                </div>

                {/* Right Side Image */}
                <div className="h-full flex items-center justify-center hidden md:block">
                  <img src={Iphoto} alt="Login Illustration" className="w-full h-full"/>
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer />
    </div>
  );
};

export default LandingPage;
