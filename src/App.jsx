import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "./index.css";


import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Information from "./pages/Information";
import Donors from "./pages/donors";
import Recipient from "./pages/Recipient";
import ContactUs from "./pages/ContactUs";
import LogIn from "./pages/LogIn";
import Submit from "./pages/SubmitDonation";
import ActiveDonations from "./pages/ActiveDonations";

import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import DonorProfile from "./pages/DonorProfile";
import RecipientProfile from "./pages/RecipientProfile";

import DonorDonations from "./pages/DonorDonations";
import RecipientApplications from "./pages/RecipientApplications";
import DonorApplications from "./pages/DonorApplications";

import DonorAcceptedApplications from "./pages/DonorAcceptedApplications";
import RecipientAcceptedApplications from "./pages/RecipientAcceptedApplications";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

import DonationDetails from "./pages/DonationDetails";

import EmailVerified from "./pages/EmailVerified";

function App() {
  const location = useLocation();

  const noHeaderFooterRoutes = [
    "/login",
    "/active-donations",
    "/submit",
    "/donor-dashboard",
    "/recipient-dashboard",
    "/admin-dashboard",
    "/donor-profile",
    "/recipient-profile",
    "/donor-donations",
    "/recipient-applications",
    "/donor-applications",
    "/donor-accepted-applications",
    "/recipient-accepted-applications",
    "/forgot-password",
    "/reset-password",
    "/change-password",
    "/donations/:id",
    "/email-verified"
  ];

  const hideHeaderFooter = noHeaderFooterRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "1.125rem",
            padding: "1rem 1.5rem",
            minWidth: "400px",
            minHeight: "70px",
            borderRadius: "0.75rem",
          },
        }}
      />

      {hideHeaderFooter ? (
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/active-donations" element={<ActiveDonations />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/donations/:id" element={<DonationDetails />} />
          <Route path="/email-verified" element={<EmailVerified />} />

          {/* Protected Routes */}
          <Route path="/submit" element={<ProtectedRoute allowedRole="donor">
            <Submit />
          </ProtectedRoute>} />

          <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient-dashboard"
            element={
              <ProtectedRoute allowedRole="recipient">
                <RecipientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donor-profile"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient-profile"
            element={
              <ProtectedRoute allowedRole="recipient">
                <RecipientProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor-donations"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient-applications"
            element={
              <ProtectedRoute allowedRole="recipient">
                <RecipientApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor-applications"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor-accepted-applications"
            element={
              <ProtectedRoute allowedRole="donor">
                <DonorAcceptedApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient-accepted-applications"
            element={
              <ProtectedRoute allowedRole="recipient">
                <RecipientAcceptedApplications />
              </ProtectedRoute>
            }
          />
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
