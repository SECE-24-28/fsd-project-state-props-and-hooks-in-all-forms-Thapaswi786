import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="brand">
          <h1>🎓 Hogwarts University</h1>
          <p>Engineering College Management Portal</p>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/admission">Admission</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login" className="login-btn">Login</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
