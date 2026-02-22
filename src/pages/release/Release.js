import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReleaseForm from "../../components/forms/ReleaseForm";

function Release({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="page-container">
      <ReleaseForm />
    </div>
  );
}

export default Release;