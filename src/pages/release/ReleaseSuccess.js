import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/Success.css";

function ReleaseSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { petName, type } = location.state || {};

  return (
    <div className="success-container">
      <h1>Release Request Submitted</h1>

      {petName && (
        <p>
          Your request to release <strong>{petName}</strong> ({type}) has been received.
        </p>
      )}

      <p>Our team will review your request and contact you shortly.</p>

      <div className="button-group">
        <button onClick={() => navigate("/")}>
          Back to Homepage
        </button>

        <button onClick={() => navigate("/release")}>
          Submit Another Request
        </button>
      </div>
    </div>
  );
}

export default ReleaseSuccess;