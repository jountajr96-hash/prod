import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Left Logo - AKK */}
      <div className="hero-left-section">
        <img src="/images/akk.png" alt="AKK Logo" className="hero-logo-left" />
      </div>
      
      {/* Center Content */}
      <div className="hero-center-content">
        <h1 className="hero-title">Hanchi Production</h1>
        <p className="hero-subtitle">Professional Video & Photo Production Services</p>
        <p className="hero-description">
          Bringing your vision to life with cinematic excellence and creative storytelling
        </p>
        <Link to="/book" className="hero-button">Book Our Services</Link>
      </div>
      
      {/* Right Logo - HPROD */}
      <div className="hero-right-section">
        <img src="/images/hprodd.png" alt="Hanchi Production" className="hero-logo-right" />
      </div>
    </div>
  );
};

export default Hero;