import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utility/ScrollToTop";
import "./Styles/App.css";

import Home from "./pages/Home";
import PetsPage from "./pages/PetsPage";
import PetDetails from "./pages/PetDetails";
import Register from "./pages/volunteer/Register";
import Release from "./pages/release/Release";
import AdoptPage from "./pages/adoption/AdoptPage";
import AdoptionSuccess from "./pages/adoption/AdoptionSuccess";
import ReleaseSuccess from "./pages/release/ReleaseSuccess";
import VolunteerSuccess from "./pages/volunteer/VolunteerSuccess";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(false);

  // On app load, check sessionStorage
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";
    setUser(loggedIn);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar user={user} setUser={setUser} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/pets" element={<PetsPage user={user} />} />
          <Route path="/pets/:id" element={<PetDetails user={user} />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route path="/release" element={<Release user={user} />} />
          <Route path="/adopt" element={<AdoptPage user={user} />} />
          <Route path="/adoption-success" element={<AdoptionSuccess />} />
          <Route path="/release-success" element={<ReleaseSuccess />} />
          <Route path="/volunteer-success" element={<VolunteerSuccess />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;