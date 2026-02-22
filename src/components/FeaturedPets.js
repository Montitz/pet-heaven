import PetCardImageOnly from "./PetCardImageOnly";
import "../Styles/Carousel.css";
import Pets from "../data/Pets";

function FeaturedPets() {
  return (
    <section className="featured-pets-section">
      <h2>Featured Pets</h2>

      <div className="featured-pets-scroll">
        <div className="scroll-track">
          {Pets.map((pet) => (
            <PetCardImageOnly key={pet.id} {...pet} />
          ))}
          {/* Duplicate for continuous scroll if needed */}
          {Pets.map((pet) => (
            <PetCardImageOnly key={pet.id + "-dup"} {...pet} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPets;
