import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { apiClient } from "../utils/apiClient";
import { toast } from "react-hot-toast";


const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  );
};

export default function ContactUs() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await apiClient.post('/contact', formData);
      toast.success("Mesazhi u dërgua me sukses!");

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Gabim: " + (error.response?.data?.message || "Diçka shkoi keq."));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-16">
        {/* Hero Section */}

        {/* Contact Form and Map Section - REPLACED THE REGISTRATION FORM */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Contact Form */}
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Na Kontaktoni</h2>

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
                      className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
                      disabled={loading}
                    >
                      {loading ? "Duke dërguar..." : "Dërgo"}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

