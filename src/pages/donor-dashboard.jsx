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

      
    </div>
  )
}
