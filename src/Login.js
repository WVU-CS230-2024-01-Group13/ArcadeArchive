import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  const handleBackLoginClick = () => {
    setShowLoginForm(false);
  };

  const handleBackSignupClick = () => {
    setShowSignupForm(false);
  };

  const handleButtonHover = (event) => {
    const button = event.target;
    button.style.backgroundColor = button.classList.contains('back-button') ? '#f0f0f0' : '#555';
  };

  const handleButtonLeave = (event) => {
    const button = event.target;
    button.style.backgroundColor = button.classList.contains('back-button') ? '#f0f0f0' : '#333';
  };

  return (
    <div className="container">
      <img src="Arcade.png" alt="Arcade Archive Logo" className="logo" />
      <div id="button-container">
        <button className="button login-button" id="login-btn" onClick={handleLoginClick}>
          Login
        </button>
        <br />
        <button className="button signup-button" id="signup-btn" onClick={handleSignupClick}>
          Create an Account
        </button>
      </div>
      <form className={`login-form ${showLoginForm ? 'active' : ''}`}>
        <input type="text" className="input-field" placeholder="Username" id="login-username" />
        <br />
        <input type="password" className="input-field" placeholder="Password" id="login-password" />
        <br />
        <button type="submit" className="button login-button">
          Submit
        </button>
        <br />
        <button type="button" className="button back-button" id="back-login-btn" onClick={handleBackLoginClick}>
          Back
        </button>
      </form>
      <form className={`signup-form ${showSignupForm ? 'active' : ''}`}>
        <input type="text" className="input-field" placeholder="Username" id="signup-username" />
        <br />
        <input type="email" className="input-field" placeholder="Email" id="signup-email" />
        <br />
        <input type="password" className="input-field" placeholder="Password" id="signup-password" />
        <br />
        <button type="submit" className="button signup-button">
          Create Account
        </button>
        <br />
        <button type="button" className="button back-button" id="back-signup-btn" onClick={handleBackSignupClick}>
          Back
        </button>
      </form>
    </div>
  );
};

export default Login;
