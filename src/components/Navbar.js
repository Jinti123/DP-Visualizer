import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import "./Navbar.css";

export default function Navbar() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        DP Visualizer
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${
            themeMode === "light" ? "dark" : "light"
          } mode`}
        >
          {themeMode === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
