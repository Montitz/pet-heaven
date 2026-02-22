import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pets from "../../data/Pets";
import "../../Styles/Form.css";

function AdoptForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get petId from URL query
  const searchParams = new URLSearchParams(location.search);
  const petId = parseInt(searchParams.get("petId"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const selectedPet = Pets.find(p => p.id === petId);

  // Set petName automatically
  useEffect(() => {
    if (selectedPet) {
      setFormData(prev => ({ ...prev, petName: selectedPet.name }));
    }
  }, [selectedPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Basic validation
    if (name === "name") setErrors(prev => ({ ...prev, name: value.trim() === "" }));
    if (name === "email") setErrors(prev => ({ ...prev, email: !/^\S+@\S+\.\S+$/.test(value) }));
    if (name === "phone") setErrors(prev => ({ ...prev, phone: !/^\d{7,15}$/.test(value) }));
    if (name === "message") setErrors(prev => ({ ...prev, message: value.length > 500 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isError = Object.values(errors).some(err => err) || !formData.name || !formData.email || !formData.phone;
    if (isError) return;

    try {
      const res = await fetch("http://localhost:5000/api/requests/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pet: formData.petName,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/adoption-success", { state: { petName: selectedPet.name } });
      } else {
        alert("Failed to submit adoption request: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting adoption request:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  if (!selectedPet) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Pet not found.</p>;
  }

  const isSubmitDisabled =
    !formData.name || !formData.email || !formData.phone ||
    errors.name || errors.email || errors.phone || errors.message;

  return (
    <form onSubmit={handleSubmit} className="adopt-form">
      <div className="pet-picture-container" style={{ textAlign: "center", marginBottom: "20px" }}>
        <img 
          src={selectedPet.image} 
          alt={selectedPet.name} 
          style={{ maxWidth: "200px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
        <h3>{selectedPet.name} ({selectedPet.type}, {selectedPet.age} yrs)</h3>
      </div>

      <input
        name="petName"
        value={formData.petName}
        readOnly
        style={{ backgroundColor: "#e0e0e0", cursor: "not-allowed" }}
      />

      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        maxLength={50}
        onChange={handleChange}
        required
      />
      {errors.name && <span className="error-text">Name is required</span>}

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        maxLength={100}
        onChange={handleChange}
        required
      />
      {errors.email && <span className="error-text">Invalid email</span>}

      <input
        name="phone"
        placeholder="Phone (digits only)"
        value={formData.phone}
        maxLength={15}
        onChange={handleChange}
        required
      />
      {errors.phone && <span className="error-text">Invalid phone number</span>}

      <textarea
        name="message"
        placeholder="Message (optional, max 500 chars)"
        value={formData.message}
        maxLength={500}
        onChange={handleChange}
      />
      {errors.message && <span className="error-text">Message too long</span>}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        style={{ opacity: isSubmitDisabled ? 0.5 : 1 }}
      >
        Submit Adoption Request
      </button>
    </form>
  );
}

export default AdoptForm;