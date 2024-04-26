import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import './styles.css';

export default function Navbar() { 
  return (
    <div class="navbar">
    <Link to="/" class="navbar-brand">
      <img src="Arcade.png" alt="Arcade Archive Logo" />
      Arcade Archive
    </Link>

    <div class="navbar-menu">
      <Link to="/" activeClassName="active">Explore</Link>
      <Link to="/create" activeClassName="active">Create</Link>
      <Link to="/analytics" activeClassName="active">Analytics</Link>
      <Link to="/social" activeClassName="active">Social</Link>
      <Link to="/profile" activeClassName="active">Profile</Link>
      <Link to="/friends" activeClassName = "active">Friends</Link>
    </div>
    <div class="greeting">Hello <span id="username">User</span>.</div>
  </div>
  );
}