import React from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/core/logout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');

        if (onLogout) {
          onLogout(); // Update state in App.js
        }

        navigate('/login', { replace: true }); // Ensure redirect happens cleanly
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Pioneer Hospital</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><Link to="/video-call">Call</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        <li><a href="#contact">Image</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
