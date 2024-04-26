import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './styles.css';
function Navbar() {

  const location = useLocation();

  // Check if the current route is the welcome view
  const isLoginView = location.pathname === '/login';
  const isSignupView = location.pathname === '/signup';
  const isLandingView = location.pathname ==='/';

  // If it's the welcome view, don't render the navbar
  if (isLoginView || isSignupView || isLandingView) {
    return null;
  }

  return (
    <div class="navbar">
    <Link to="/" class="navbar-brand">
      <img src="Arcade.png" alt="Arcade Archive Logo" />
      Arcade Archive
    </Link>

    <div class="navbar-menu">
      <Link to="/explore" activeClassName="active">Explore</Link>
      <Link to="/create" activeClassName="active">Create</Link>
      <Link to="/analytics" activeClassName="active">Analytics</Link>
      <Link to="/social" activeClassName="active">Social</Link>
      <Link to="/profile" activeClassName="active">Profile</Link>
      <Link to="/friends" activeClassName = "active">Friends</Link>
      <Link to="/" activeClassName="active">Logout</Link>
    </div>
    <div class="greeting">Hello <span id="username">User</span>.</div>
  </div>
  );
}

export default Navbar;