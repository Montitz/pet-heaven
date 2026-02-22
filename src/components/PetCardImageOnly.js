import { Link } from "react-router-dom";
import "../Styles/Carousel.css";

function PetCardImageOnly({ id, image, name }) {
  return (
    <Link to={`/pets/${id}`} className="pet-link">
        <div className="pet-card-image-only">
            <img src={image} alt={name} />
        </div>
    </Link>
  );
}

export default PetCardImageOnly;
