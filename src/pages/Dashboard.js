import { useEffect, useState } from "react";
import Pets from "../data/Pets";
import "../Styles/Dashboard.css";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [adoptions, setAdoptions] = useState([]);
  const [releases, setReleases] = useState([]);

  // Fetch data
  const fetchData = async () => {
    try {
      const [adoptRes, releaseRes] = await Promise.all([
        fetch("http://localhost:5000/api/requests/adoptions"),
        fetch("http://localhost:5000/api/requests/releases")
      ]);

      const adoptData = await adoptRes.json();
      const releaseData = await releaseRes.json();

      setAdoptions(adoptData);
      setReleases(releaseData);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get adoption pet image
  const getPetImage = (petName) => {
    const pet = Pets.find(p => p.name === petName);
    return pet ? pet.image : null;
  };

  // Sorting logic: Submitted first, newest ID first
  const sortLogic = (a, b) => {
    if (a.status === "Submitted" && b.status !== "Submitted") return -1;
    if (a.status !== "Submitted" && b.status === "Submitted") return 1;
    return b.id - a.id;
  };

  const filteredAdoptions = [...adoptions]
    .filter(item =>
      (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.pet || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort(sortLogic);

  const filteredReleases = [...releases]
    .filter(item =>
      (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.pet || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort(sortLogic);

  // Update status
  const updateStatus = async (id, type, newStatus) => {
    try {
      const endpoint =
        type === "adoption"
          ? `http://localhost:5000/api/requests/adoptions/${id}`
          : `http://localhost:5000/api/requests/releases/${id}`;

      await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (type === "adoption") {
        setAdoptions(prev =>
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
      } else {
        setReleases(prev =>
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Status color
  const statusColor = (status) => {
    switch (status) {
      case "Submitted": return "status-submitted";
      case "Pending Review": return "status-pending-review";
      case "Pending Interview": return "status-pending-interview";
      case "Approved": return "status-approved";
      default: return "";
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <input
        type="text"
        placeholder="Search by name or pet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="dashboard-grid">

        {/* ADOPTION */}
        <div className="dashboard-column">
          <h3>Adoption Requests</h3>
          {filteredAdoptions.length === 0 && <p>No adoption requests.</p>}

          {filteredAdoptions.map((item) => (
            <div key={item.id} className="request-card">
              <div className="request-content">

                {/* LEFT TEXT */}
                <div className="request-text">
                  {item.status === "Submitted" && <span className="new-badge">New</span>}

                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Pet:</strong> {item.pet}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Phone:</strong> {item.phone}</p>
                  {item.message && <p><strong>Message:</strong> {item.message}</p>}

                  <p>
                    <strong>Status:</strong>{" "}
                    <select
                      value={item.status}
                      className={`status-dropdown ${statusColor(item.status)}`}
                      onChange={(e) => updateStatus(item.id, "adoption", e.target.value)}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Pending Interview">Pending Interview</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </p>
                </div>

                {/* RIGHT IMAGE */}
                {getPetImage(item.pet) && (
                  <img src={getPetImage(item.pet)} alt={item.pet} className="request-image"/>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* RELEASE */}
        <div className="dashboard-column">
          <h3>Release Requests</h3>
          {filteredReleases.length === 0 && <p>No release requests.</p>}

          {filteredReleases.map((item) => (
            <div key={item.id} className="request-card">
              <div className="request-content">

                {/* LEFT TEXT */}
                <div className="request-text">
                  {item.status === "Submitted" && <span className="new-badge">New</span>}

                  <p><strong>Owner:</strong> {item.name}</p>
                  <p><strong>Pet:</strong> {item.pet}</p>
                  <p><strong>Type:</strong> {item.type}</p>
                  <p><strong>Age:</strong> {item.age}</p>
                  {item.reason && <p><strong>Reason:</strong> {item.reason}</p>}

                  <p>
                    <strong>Status:</strong>{" "}
                    <select
                      value={item.status}
                      className={`status-dropdown ${statusColor(item.status)}`}
                      onChange={(e) => updateStatus(item.id, "release", e.target.value)}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Pending Interview">Pending Interview</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </p>
                </div>

                {/* NO IMAGE */}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;