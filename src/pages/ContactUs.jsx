"use client"

import { useState } from "react"
import { Facebook, Twitter, Instagram, Youtube, Globe, Menu, X } from "lucide-react"

// Replacing Next.js components with standard components
const Button = ({ children, className, variant, size, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant || "default"]} ${sizeClasses[size || "default"]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  )
}

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  )
}

export default function ContactUs() {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b py-3 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">👋</span>
            <a href="/" className="font-bold text-gray-800">
              Ndihmo Tjetrin
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm text-gray-600 bold">
            <a href="#">Kryefaqja</a>
            <a href="#">Donacionet</a>
            <a href="#">Regjistro një Familje</a>
            <a href="#">Regjistro një Biznes</a>
            <a href="#">Kontakt</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Globe className="h-4 w-4 mr-1" />
              Shqip
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-4 bg-white border-t">
            <nav className="flex flex-col space-y-3 text-sm text-gray-600">
              <a href="#" className="py-1">
                Kryefaqja
              </a>
              <a href="#" className="py-1">
                Donacionet
              </a>
              <a href="#" className="py-1">
                Regjistro një Familje
              </a>
              <a href="#" className="py-1">
                Regjistro një Biznes
              </a>
              <a href="#" className="py-1">
                Kontakt
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}

        {/* Contact Form and Map Section - REPLACED THE REGISTRATION FORM */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Contact Form */}
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">Na Kontaktoni</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Emri
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Futi emrin tuaj"
                        className="w-full border-gray-300"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="emer.mbiemer@gmail.com"
                        className="w-full border-gray-300"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Pyetje
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Futi pyetje apo sugjerime"
                        rows={4}
                        className="w-full border-gray-300"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    >
                      Dërgo
                    </Button>
                  </form>
                </div>

                {/* Map */}
                <div className="relative h-full min-h-[400px] bg-gray-100">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=20.85743284746738%2C42.88075638272592%2C20.86143284746738%2C42.88475638272592&amp;layer=mapnik&amp;marker=42.88275638272592%2C20.85943284746738"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                    title="Map"
                    className="w-full h-full"
                  ></iframe>

                  {/* Coordinates display */}
                  <div className="absolute top-2 left-2 bg-white bg-opacity-90 p-2 rounded shadow-md text-xs z-10">
                    Koordinatat: 42.88275638272592, 20.85943284746738
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-medium mb-4">Abonohu në Buletinin Informativ</h3>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <Input placeholder="Email juaj këtu" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">Abonohu</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-yellow-500 text-xl">👋</span>
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
    </div>
  )
}

