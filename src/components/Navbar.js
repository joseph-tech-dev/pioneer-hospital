import React from 'react';
import '../styles/Navbar.css'; // Import the CSS for the Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Pioneer Hospital</div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#contact">login</a></li>
                <li><a href="#contact">sign up</a></li>
                <li><a href="#contact">image</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
