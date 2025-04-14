import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import Information from "./pages/Information";
import Donors from "./pages/donors";
import Recipient from "./pages/Recipient";
import ContactUs from "./pages/ContactUs";
import LogIn from "./pages/LogIn";
import Submit from "./pages/SubmitDonation";
import DonacionetAktive from "./pages/DonacionetAktive";
import Layout from "./components/Layout";
import DonorDashboard from "./pages/DonorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/login", "/donacionetaktive", "/submit", "/donor-dashboard", "/admin-dashboard"];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" />
      {hideHeaderFooter ? (
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/donacionetaktive" element={<DonacionetAktive />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/submit" element={<Submit />} />

        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/information" element={<Information />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/recipient" element={<Recipient />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
