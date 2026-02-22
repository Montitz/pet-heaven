import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdoptForm from "../../components/forms/AdoptForm";
import Pets from "../../data/Pets";

function AdoptPage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const petId = query.get("petId");

  const selectedPet = Pets.find(p => p.id === parseInt(petId));

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="page-container">
      <h2>Adoption Form</h2>
      <AdoptForm selectedPet={selectedPet} />
    </div>
  );
}

export default AdoptPage;