import React from 'react';
import './Header.css'; // Create a new CSS file for header styles

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Codeall</div>
      <nav>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#login">Login</a>
        <a href="#signup" className="signup-button">Sign Up Free</a>
      </nav>
    </header>
  );
};

export default Header;
