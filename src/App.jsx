import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import Landing from "./pages/Landing";
import Information from "./pages/Information";
import Donors from "./pages/Donors";
import Recipient from "./pages/Recipient";
import ContactUs from "./pages/ContactUs";
import LogIn from "./pages/LogIn";
import Submit from "./pages/SubmitDonation";
import DonacionetAktive from "./pages/DonacionetAktive";
import Layout from "./components/Layout";

function App() {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/login", "/donacionetaktive", "/submit"];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {hideHeaderFooter ? (
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/donacionetaktive" element={<DonacionetAktive />} />
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
