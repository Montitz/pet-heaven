import { Link, useNavigate } from "react-router-dom";
import FeaturedPets from "../components/FeaturedPets";
import Pets from "../data/Pets";
import "../Styles/App.css";
import "../Styles/Navbar.css";

function Home({ user }) {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="navbar-logo">
         <Link to="/">
            <img src="/images/logo.jpg" alt="Pet Heaven Logo" />
         </Link>
         </div>
        <h1>Welcome to Pet Heaven</h1>
        <p>Giving pets a loving second chance</p>
      </div>

      {/* Mission, Vision, Values */}
      <section className="mvv-section">
        <h2>Our Mission, Vision & Values</h2>
        <div className="mvv-cards">
          <div className="mvv-card">
            <h3>Mission</h3>
            <p>To rescue, rehabilitate, and rehome abandoned cats and dogs while promoting responsible pet ownership.</p>
          </div>
          <div className="mvv-card">
            <h3>Vision</h3>
            <p>A world where every abandoned pet finds a loving, permanent home and thrives in a safe environment.</p>
          </div>
          <div className="mvv-card">
            <h3>Values</h3>
            <p>Compassion, responsibility, integrity, and dedication to animal welfare.</p>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="featured-pets-section">
        <h2>Meet Our Lovely Pets</h2>
        <p>Give them a second chance at a loving home ❤️</p>
        <FeaturedPets pets={Pets} />
      </section>

      {/* Volunteer Section */}
      <section className="volunteer-section">
        <h2>Volunteer With Us</h2>
        <p>Volunteering at Pet Heaven is a rewarding way to make a real difference in the lives of abandoned pets.</p>
        <p>Our volunteers work closely with our team to ensure every pet receives love, care, and attention.</p>
        <p>Join our community of compassionate animal lovers and help us give every pet a second chance at a loving home.</p>
      </section>

      {/* Call to Action */}
      <section className="call-to-action">
        <button className="button" onClick={() => navigate("/pets")}>
          Adopt a Pet
        </button>

        <button
          className="button"
          onClick={() => {
            if (user) navigate("/release");
            else {
              sessionStorage.setItem("redirectAfterLogin", "/release");
              navigate("/login");
            }
          }}
        >
          Release a Pet
        </button>

        <button
          className="button"
          onClick={() => {
            if (user) navigate("/register");
            else {
              sessionStorage.setItem("redirectAfterLogin", "/register");
              navigate("/login");
            }
          }}
        >
          Become a Volunteer
        </button>
      </section>
    </div>
  );
}

export default Home;