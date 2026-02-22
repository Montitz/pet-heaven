import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerForm from "../../components/forms/VolunteerForm";

function Register({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="page-container">
      <VolunteerForm />
    </div>
  );
}

export default Register;