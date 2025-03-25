import { Routes, Route } from "react-router-dom"
//import "./App.css"
import "./index.css"
import ScrollToTop from "./components/ScrollToTop"
//import Header from "./components/Header"
import Landing from "./pages/Landing"
import Information from "./pages/Information"
import Donors from "./pages/donors"
import Recipient from "./pages/Recipient"
import ContactUs from "./pages/ContactUs"
import LogIn from "./pages/LogIn"
import Submit from "./pages/SubmitDonation"

function App() {
  return (
    <div>
      {/* <Header /> */}
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/information" element={<Information />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/recipient" element={<Recipient />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

