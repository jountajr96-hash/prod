import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Professional video and photo production services for all your creative needs.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: info@hanchiproduction.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Production St, City, Country</p>
        </div>
        <div className="footer-section">
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hanchi Production. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;