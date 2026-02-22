import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST", 
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        // Clear frontend storage and state first
        sessionStorage.clear();
        setUser(false);

        // Use a small delay to ensure state updates before navigating
        setTimeout(() => {
          navigate("/", { replace: true }); // guaranteed redirect home
        }, 50);
      } else {
        console.error("Logout failed on server");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Pet Heaven</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/pets">Pets</Link>

        <Link
          to={user ? "/register" : "/login"}
          onClick={() => {
            if (!user) sessionStorage.setItem("redirectAfterLogin", "/register");
          }}
        >
          Register
        </Link>

        <Link
          to={user ? "/release" : "/login"}
          onClick={() => {
            if (!user) sessionStorage.setItem("redirectAfterLogin", "/release");
          }}
        >
          Release
        </Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;