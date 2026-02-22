import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Auth.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/check-session", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUser(true);
          const redirect = sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
          navigate(redirect);
        }
      });
  }, [navigate, setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("loggedIn", "true");
        setUser(true);

        // Redirect to the intended page or dashboard
        const redirect = sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
        sessionStorage.removeItem("redirectAfterLogin");
        navigate(redirect);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;