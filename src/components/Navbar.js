import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logos">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          </Link>
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          </Link>
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#services" className="nav-links" onClick={closeMobileMenu}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#portfolio" className="nav-links" onClick={closeMobileMenu}>
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/book" className="nav-links" onClick={closeMobileMenu}>
              Book Our Services
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;