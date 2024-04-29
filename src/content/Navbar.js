import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
function Navbar() {

  const location = useLocation();

  // Check if the current route is the welcome view
  const isLoginView = location.pathname === '/login';
  const isSignupView = location.pathname === '/signup';
  
  // If it's the welcome view, don't render the navbar
  if (isLoginView || isSignupView) {
    return null;
  }

  return (
  <div class="navbar navbar-menu">
      <Link to="/" class="navbar-brand jersey-15-regular" style={{color: "white", fontSize: "35px"}}>
        <img src="Arcade.png" alt="Arcade Archive Logo" />
          ARCADE ARCHIVE
      </Link>

    <div>
      <Link to="/" activeClassName="active">Explore</Link>
      <Link to="/create" activeClassName="active">Create</Link>
      <Link to="/analytics" activeClassName="active">Analytics</Link>
      <Link to="/social" activeClassName="active">Social</Link>
      <Link to="/profile" activeClassName="active">Profile</Link>
      <Link to="/friends" activeClassName = "active">Friends</Link>
    </div>
  </div>
  );
}

export default Navbar;