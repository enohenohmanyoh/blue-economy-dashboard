import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();                // clear token and user data
    setIsAuthenticated(false);           // update app state
    navigate("/login");                  // redirect to login
  };

  return (
    <header className="header">
      <div className="logo">WELCOME TO BLUE ECONOMY ADMIN DASHBOARD</div>
      <ul>
        
      </ul>
      <div className="user-menu">
        <button
          className="icon-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaUserCircle size={28} />
        </button>
        {dropdownOpen && (
          <div className="dropdown">
            <Link to="/login" className="dropdown-link">Login</Link>
            <Link to="/register" className="dropdown-link">Create Account</Link>
            <button onClick={handleLogout} className="dropdown-link logout-btn">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
