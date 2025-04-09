import { useState } from "react"
import { PlusCircle } from "lucide-react"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"
import logo from "../assets/logo.png";
import NavLink from "../components/NavLink";

export default function DonationDashboard() {
  const [donations] = useState([
    {
      id: 1,
      description: "Pako Ushqimore 1",
      initiative: "Iniciativa A",
      amount: 500,
      status: "Kompletuar",
      date: "Mars 13, 2025",
    },
    {
      id: 2,
      description: "Pako Ushqimore 1",
      initiative: "Iniciativa B",
      amount: 250,
      status: "Kompletuar",
      date: "Shkurt 1, 2025",
    },
    {
      id: 3,
      description: "Pako Ushqimore 1",
      initiative: "Iniciativa C",
      amount: 100,
      status: "Në Procesim",
      date: "Janar 15, 2025",
    },
  ])

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-auto">
      <header className="flex justify-between items-center mb-8 bg-white border-b px-6 py-4">
        <div className="max-w-4xl flex items-center ml-0">
            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8" />
            <Link to="/" className="font-bold text-black">
            Ndihmo Tjetrin
            </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
            <span>F</span>
          </div>
          <span className="font-medium">Filan Fisteku</span>
        </div>
      </header>

      <section className="ml-20 mr-20">
        <h2 className="text-xl font-bold mb-2">Donacionet e mia</h2>
        <p className="text-gray-600 mb-8">Ndjek dhe menaxho dhurimet e tua bamirëse</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Replaced Card with direct div styling */}
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-1">Donacionet Totale</p>
            <p className="text-3xl font-bold">2,450€</p>
          </div>
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-1">Donacionet këtë vit</p>
            <p className="text-3xl font-bold">850€</p>
          </div>
          <div className="rounded-lg border bg-white shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-1">Numri i Donacioneve</p>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Replaced Button with direct Button styling */}
        {/* <Link to="/submit"> */}
        <Button className="inline-flex items-center ">
          <PlusCircle className="mr-2 h-4 w-4" />
          Bëj një Donacion të Ri
        </Button>
        {/* </Link> */}
      </section>

      <section className="ml-20 mr-20 mt-10">
        <h2 className="text-xl font-bold mb-6 bg-white px-6 py-4">Historia e Donacioneve</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-4 font-medium">PËRSHKRIMI</th>
                <th className="pb-4 font-medium">PËRFITUESI</th>
                <th className="pb-4 font-medium">VLERA</th>
                <th className="pb-4 font-medium">STATUSI</th>
                <th className="pb-4 font-medium">DATA</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b bg-white px-6 py-4">
                  <td className="py-4 px-6">{donation.description}</td>
                  <td className="py-4 px-6">{donation.initiative}</td>
                  <td className="py-4 px-6">{donation.amount}€</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        donation.status === "Kompletuar"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-4">{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-500 text-sm bg-white px-6 py-4">
        <p>2025 Ndihmo Tjetrin. Të gjitha të drejtat e rezervuara.</p>
      </footer>
    </div>
  )
}
