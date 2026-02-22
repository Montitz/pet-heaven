import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/Success.css";

function AdoptionSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { petName, petImage } = location.state || {}; // get pet data from previous page

  return (
    <div className="success-container">
      {petImage && <img src={petImage} alt={petName} className="pet-picture" />}
      <h1>Adoption Request Submitted!</h1>
      {petName && <p>You have successfully submitted a request to adopt <strong>{petName}</strong>.</p>}
      <p>We will contact you shortly with next steps of your new journey.</p>
      <div className="button-group">
        <button onClick={() => navigate("/pets")}>Back to Pets</button>
        <button onClick={() => navigate("/")}>Back to Homepage</button>
      </div>
    </div>
  );
}

export default AdoptionSuccess;