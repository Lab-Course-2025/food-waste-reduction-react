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

      
    </div>
  )
}
