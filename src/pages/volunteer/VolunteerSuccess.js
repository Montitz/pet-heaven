import { useNavigate } from "react-router-dom";
import "../../Styles/Success.css";

function VolunteerSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1>Volunteer Registration Submitted!</h1>
      <p>Thank you for signing up to volunteer with us.</p>
      <p>Our team will contact you soon with more details via email.</p>

      <div className="button-group">
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
        <button onClick={() => navigate("/pets")}>
          View Pets
        </button>
      </div>
    </div>
  );
}

export default VolunteerSuccess;