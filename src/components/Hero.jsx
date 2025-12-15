import { useState, useEffect } from 'react';
import './Hero.css';
import heroImage from '../assets/img/heroImg2-min.png';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className={`hero ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-left">
            <div className="hero-badge">
              #1 Plumbing Solution in Ottawa
            </div>
            <div className="hero-title-wrapper">
              <h1 className="hero-title">
                Quality plumbing solutions for every Home
                <span className="hero-title-mask"></span>
              </h1>
            </div>
            <div className="hero-description-wrapper">
              <p className="hero-description">
                Professional repairs, installations, and emergency plumbing services backed by over a decade of experience.
                <span className="hero-description-mask"></span>
              </p>
            </div>
            <div className="hero-image-mobile">
              <img 
                src={heroImage} 
                alt="Maya Plumbing professional plumber in Ottawa with service van" 
                loading="eager"
              />
            </div>
          </div>

          <div className="hero-right">
              {/* Hero Image - Desktop */}
        <div className="hero-image-desktop">
          <img 
            src={heroImage} 
            alt="Maya Plumbing professional plumber in Ottawa with service van" 
            loading="eager"
          />
        </div>
          </div>
          <div className="consultation-card">
              <h2 className="consultation-title">Get free consultation</h2>
              <p className="consultation-subtitle">
                Our licensed plumbers in Ottawa deliver fast, reliable, and affordable services tailored to your needs.
              </p>
              <form className="consultation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Jane Smith"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="janesmith@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Select Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    placeholder="Select Service"
                  >
                    <option disabled value="">Select Service</option>
                    <option value="residential">Residential Plumbing</option>
                    <option value="commercial">Commercial Plumbing</option>
                    <option value="kitchen">Kitchen Plumbing</option>
                    <option value="bathroom">Bathroom Plumbing</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="repairs">Repairs</option>
                    <option value="installation">Installation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell us more</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help? Describe your problem"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="form-submit">
                  Request Assistance
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
        </div>

      
      </div>
    </section>
  );
};

export default Hero;

