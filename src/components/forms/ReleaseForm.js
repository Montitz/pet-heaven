import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Form.css";

function ReleaseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    type: "",
    ageYears: "",
    ageMonths: "",
    reason: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.petName || !formData.type) return;

    const ageString = `${formData.ageYears} year${formData.ageYears > 1 ? "s" : ""} ${formData.ageMonths} month${formData.ageMonths > 1 ? "s" : ""}`;

    try {
      const res = await fetch("http://localhost:5000/api/requests/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.ownerName,
          pet: formData.petName,
          type: formData.type,
          age: ageString,
          reason: formData.reason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/release-success", {
          state: {
            petName: formData.petName,
            type: formData.type,
            age: ageString,
          },
        });
      } else {
        alert("Failed to submit release request: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting release request:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const isSubmitDisabled =
    !formData.ownerName ||
    !formData.petName ||
    !formData.type ||
    formData.ageYears === "" ||
    formData.ageMonths === "";

  return (
    <form onSubmit={handleSubmit} className="adopt-form">
      <h2>Release a Pet</h2>

      <input
        name="ownerName"
        placeholder="Owner Name"
        value={formData.ownerName}
        onChange={handleChange}
        required
      />

      <input
        name="petName"
        placeholder="Pet Name"
        value={formData.petName}
        onChange={handleChange}
        required
        autoComplete="off"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <option value="">Select Type</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          name="ageYears"
          type="number"
          placeholder="Years"
          min={0}
          value={formData.ageYears}
          onChange={handleChange}
          required
          style={{ flex: 1 }}
        />
        <input
          name="ageMonths"
          type="number"
          placeholder="Months"
          min={0}
          max={11}
          value={formData.ageMonths}
          onChange={handleChange}
          required
          style={{ flex: 1 }}
        />
      </div>

      <textarea
        name="reason"
        placeholder="Reason for release"
        value={formData.reason}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isSubmitDisabled}
        style={{ opacity: isSubmitDisabled ? 0.5 : 1 }}
      >
        Submit Release Request
      </button>
    </form>
  );
}

export default ReleaseForm;