import { Link } from "react-router-dom";
import "../Styles/PetCard.css";

function PetCard({ id, name, type, breed, age, image, description, temperament }) {
  return (
    <div className="pet-card">
      <img src={image} alt={name} className="pet-card-image" />
      <h3>{name} ({type})</h3>
      <p><strong>Breed:</strong> {breed}</p>
      <p><strong>Age:</strong> {age} {age === 1 ? "year" : "years"}</p>
      <p><strong>Temperament:</strong> {temperament}</p>
      <p className="pet-description">{description}</p>
      <Link to={`/pets/${id}`}>
        <button className="adopt-btn">View & Adopt</button>
      </Link>
    </div>
  );
}

export default PetCard;

