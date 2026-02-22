import { useParams, useNavigate } from "react-router-dom";
import "../Styles/PetDetails.css";
import "../Styles/App.css";
import Pets from "../data/Pets";

function PetDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find pet by id
  const pet = Pets.find((p) => p.id === parseInt(id));
  if (!pet) return <h2>Pet not found</h2>;

  const handleAdopt = () => {
    if (user) {
      // Already logged in → go to adoption form
      navigate(`/adopt?petId=${pet.id}`);
    } else {
      // Not logged in → save intended redirect and go to login
      sessionStorage.setItem("redirectAfterLogin", `/adopt?petId=${pet.id}`);
      navigate("/login");
    }
  };

  return (
    <div className="page-container pet-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="pet-details">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        <div className="pet-info">
          <h1>{pet.name}</h1>
          <p><strong>Type:</strong> {pet.type}</p>
          {pet.breed && <p><strong>Breed:</strong> {pet.breed}</p>}
          <p><strong>Age:</strong> {pet.age} {pet.age > 1 ? "years" : "year"}</p>
          {pet.gender && <p><strong>Gender:</strong> {pet.gender}</p>}
          {pet.size && <p><strong>Size:</strong> {pet.size}</p>}
          {pet.color && <p><strong>Color:</strong> {pet.color}</p>}
          {typeof pet.vaccinated === "boolean" && (
            <p><strong>Vaccinated:</strong> {pet.vaccinated ? "Yes" : "No"}</p>
          )}
          {typeof pet.spayedNeutered === "boolean" && (
            <p><strong>Spayed/Neutered:</strong> {pet.spayedNeutered ? "Yes" : "No"}</p>
          )}
          {pet.temperament && <p><strong>Temperament:</strong> {pet.temperament}</p>}
          <p className="description">{pet.description}</p>

          {/* Only trigger login when Adopt is clicked */}
          <button className="adopt-button" onClick={handleAdopt}>
            Adopt {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;