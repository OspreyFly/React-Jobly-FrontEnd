import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav >
      <ul id="navbar" className="nav nav-pills">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/companies">Companies</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/jobs">Jobs</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login">Login/Sign Up</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
