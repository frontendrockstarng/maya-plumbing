import React, { useEffect, useRef } from 'react';
import '../App.css';
import serviceImg1 from '../assets/img/serviceImg1.png';
import serviceImg2 from '../assets/img/serviceImg2.png'
import serviceImg3 from '../assets/img/serviceImg3.png'
import serviceImg4 from '../assets/img/serviceImg4.png'
import serviceImg5 from '../assets/img/serviceImg5.png'
import serviceImg6 from '../assets/img/serviceImg6.png'


const Services = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          // Unobserve after animation starts to avoid unnecessary callbacks
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe cards
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    // Cleanup
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Add ref to each card
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };
  const services = [
    {
      title: 'Emergency Repairs',
      description: 'Rapid-response plumbing repairs available 24/7 for urgent issues.',
      image: serviceImg1,
      cta: 'Book Service'
    },
    {
      title: 'Leak Detection',
      description: 'Advanced leak detection to find hidden problems before they escalate.',
      image: serviceImg2,
      cta: 'Book Service'
    },
    {
      title: 'Drain Cleaning',
      description: 'Professional drain cleaning that removes blockages safely and effectively.',
      image: serviceImg3,
      cta: 'Book Service'
    },
    {
      title: 'Water Heater Installation',
      description: 'Expert installation of energy-efficient water heaters for reliable hot water.',
      image: serviceImg4,
      cta: 'Book Service'
    },
    {
      title: 'Toilet & Faucet Repair',
      description: 'Fixing leaking faucets and malfunctioning toilets with fast, clean service.',
      image: serviceImg5,
      cta: 'Book Service'
    },
    {
      title: 'Pipe Installation & Servicing',
      description: 'We ensure your plumbing system stays strong, efficient, and long-lasting.',
      image: serviceImg6,
      cta: 'Book Service'
    }
  ];

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="ServicesContainer">
        <div className="section-header" ref={headerRef}>
          <div className="hero-badge">
            Service Areas
          </div>
          <h2>We provide the best comprehensive plumbing solutions in Ottawa</h2>
        </div>
        
        <div className="services-grid">
          <div className="grid-wrapper">
            {services.map((service, index) => (
              <div 
                className="service-card" 
                key={index}
                ref={addToRefs}
              >
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <button className="service-cta">
                    {service.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
