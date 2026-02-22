import PetCard from "../components/PetCard";
import Pets from "../data/Pets";
import "../Styles/PetsPage.css";

function PetsPage() {
  return (
    <div className="page-container">
      <h2>Pets Available for Adoption</h2>
      <div className="pets-list">
        {Pets.map((pet) =>  (
          <PetCard key={pet.id} {...pet} />
        ))}
      </div>
      <hr className="separator" />
    </div>
  );
}

export default PetsPage;
