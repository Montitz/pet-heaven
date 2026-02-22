import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Form.css";

function VolunteerForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: true, 
    email: true,
    phone: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation
    switch (name) {
      case "name":
        setErrors((prev) => ({ ...prev, name: value.trim() === "" }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: !/^\S+@\S+\.\S+$/.test(value) }));
        break;
      case "phone":
        setErrors((prev) => ({ ...prev, phone: !/^\d{7,15}$/.test(value) }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors) return;

    console.log("Volunteer Data:", formData);
    navigate("/volunteer-success", { state: { name: formData.name } });
  };

  // Button disabled only if any required field has error
  const isSubmitDisabled = Object.values(errors).some((err) => err);

  return (
    <form onSubmit={handleSubmit} className="adopt-form">
      <h2>Become a Volunteer</h2>

      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        maxLength={50}
        required
      />
      {errors.name && <span className="error-text">Name is required</span>}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        maxLength={100}
        required
      />
      {errors.email && <span className="error-text">Invalid email</span>}

      <input
        name="phone"
        placeholder="Phone (digits only)"
        value={formData.phone}
        onChange={handleChange}
        maxLength={15}
        required
      />

      <button
        type="submit"
        disabled={isSubmitDisabled}
        style={{ opacity: isSubmitDisabled ? 0.5 : 1 }}
      >
        Register
      </button>
    </form>
  );
}

export default VolunteerForm;