import { useState } from 'react';
import './Navbar.css';
import mayaLogo from '../assets/img/mayaLogo.svg'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <a href="/" className="navbar-logo">
           <img src={mayaLogo} alt="Maya Plumbing Logo" /> 
          </a>

          {/* Desktop Navigation */}
          <ul className="navbar-menu">
            <li><a href="#services" className="navbar-link">Services</a></li>
            <li><a href="#about" className="navbar-link">About us</a></li>
            <li><a href="#testimonials" className="navbar-link">Testimonials</a></li>
            <li><a href="#gallery" className="navbar-link">Gallery</a></li>
          </ul>

          {/* CTA Button */}
          <a href="tel:+16136140064" className="navbar-cta">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3 14.3C17.1 14.3 15.9 14.1 14.8 13.7C14.5 13.6 14.1 13.7 13.9 13.9L12.2 15.9C9.4 14.5 5.6 10.8 4.1 7.9L6.1 6.1C6.3 5.9 6.4 5.5 6.3 5.2C5.9 4.1 5.7 2.9 5.7 1.7C5.7 1 5.2 0.5 4.5 0.5H1.7C1 0.5 0.5 1 0.5 1.7C0.5 11.3 8.2 19 17.8 19C18.5 19 19 18.5 19 17.8V15C19 14.3 18.5 13.8 17.8 13.8L18.3 14.3Z" fill="white"/>
            </svg>
            +1-613-614-0064
          </a>

          {/* Mobile Menu Toggle */}
          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#services" onClick={toggleMenu}>Services</a></li>
            <li><a href="#about" onClick={toggleMenu}>About us</a></li>
            <li><a href="#testimonials" onClick={toggleMenu}>Testimonials</a></li>
            <li><a href="#gallery" onClick={toggleMenu}>Gallery</a></li>
          </ul>
          <a href="tel:+16136140064" className="mobile-cta">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3 14.3C17.1 14.3 15.9 14.1 14.8 13.7C14.5 13.6 14.1 13.7 13.9 13.9L12.2 15.9C9.4 14.5 5.6 10.8 4.1 7.9L6.1 6.1C6.3 5.9 6.4 5.5 6.3 5.2C5.9 4.1 5.7 2.9 5.7 1.7C5.7 1 5.2 0.5 4.5 0.5H1.7C1 0.5 0.5 1 0.5 1.7C0.5 11.3 8.2 19 17.8 19C18.5 19 19 18.5 19 17.8V15C19 14.3 18.5 13.8 17.8 13.8L18.3 14.3Z" fill="white"/>
            </svg>
            +1-613-614-0064
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

