import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import Information from "./pages/Information";
import Donors from "./pages/Donors";
import Recipient from "./pages/Recipient";
import ContactUs from "./pages/ContactUs";
import LogIn from "./pages/LogIn";
import Submit from "./pages/SubmitDonation";
import DonacionetAktive from "./pages/DonacionetAktive";
import Layout from "./components/Layout";
import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DonorProfile from './pages/DonorProfile';
import RecipientProfile from './pages/RecipientProfile';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    "/login", "/donacionetaktive",
    "/submit", "/donor-dashboard",
    "/recipient-dashboard", "/admin-dashboard",
    "/donor-profile", "/recipient-profile"
  ];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: {
          fontSize: "1.125rem",
          padding: "1rem 1.5rem",
          minWidth: "400px",
          minHeight: "70px",
          borderRadius: "0.75rem"
        }
      }} />
      {hideHeaderFooter ? (
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/donacionetaktive" element={<DonacionetAktive />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/donor-profile" element={<DonorProfile />} />
          <Route path="/recipient-profile" element={<RecipientProfile />} />
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
