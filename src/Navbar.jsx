import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import './Navbar.css';

const Navbar = ({ setToken }) => {

  const { currentUser, setCurrentUser } = useUser();

  const handleSignOut = () => {
    setCurrentUser(null); // Set currentUser to null
    setToken('');
    localStorage.removeItem('joblyToken'); // Remove the token from local storage
  };

  return (
    <div id="nav-container">
      <span> </span>
      <nav id="nav" >
        <ul id="nav-list">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/companies">Companies</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/jobs">Jobs</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
          {!currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to='/login'>Login / Signup</Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item"><button onClick={handleSignOut}>Sign-Out</button></li>
          )}

          {currentUser && <li className="nav-item">{"Welcome back, " + currentUser.username + "!"}</li>}
        </ul>
      </nav>
    </div>

  );
};

export default Navbar;
