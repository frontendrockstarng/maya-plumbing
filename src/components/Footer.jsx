import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import footerlogo from '../assets/img/footerlogo.svg';

// Scroll reveal hook
function useRevealOnScroll(delay = 0) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);
  return [ref, visible];
}

const Footer = () => {
  const [logoRef, logoVisible] = useRevealOnScroll(0);
  const [navRef, navVisible] = useRevealOnScroll(200);
  const [servicesRef, servicesVisible] = useRevealOnScroll(300);
  const [contactRef, contactVisible] = useRevealOnScroll(400);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div ref={logoRef} className={`footer-logo scroll-reveal${logoVisible ? ' revealed' : ''}`}>
          {/* Placeholder for logo */}
          <img src={footerlogo} alt="Maya Plumbing Logo" />
        </div>
        <div className="footer-columns">
          <div ref={navRef} className={`footer-col scroll-reveal${navVisible ? ' revealed' : ''}`}>
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          <div ref={servicesRef} className={`footer-col scroll-reveal${servicesVisible ? ' revealed' : ''}`}>
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li><a href="#">Water Heater Installation</a></li>
              <li><a href="#">Toilet & Faucet Repair</a></li>
              <li><a href="#">Emergency Repairs</a></li>
              <li><a href="#">Pipe Installation & Servicing</a></li>
              <li><a href="#">Drain Cleaning</a></li>
              <li><a href="#">Leak Detection</a></li>
            </ul>
          </div>
          <div ref={contactRef} className={`footer-col scroll-reveal${contactVisible ? ' revealed' : ''}`}>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li><i className="fas fa-phone"></i> +1-613-614-0064</li>
              <li><i className="fas fa-envelope"></i> ryan.mayaplumbing@gmail.com</li>
              <li><i className="fas fa-map-marker-alt"></i> 121 Pielo Street, Toronto, Ottawa, Canada</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
