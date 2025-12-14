import React, { useEffect, useRef } from 'react';
import '../App.css';
import serviceImg1 from '../assets/img/serviceImg1.png';
import articleImg2 from '../assets/img/articleImg2.png'
import serviceImg3 from '../assets/img/serviceImg3.png'



const Articles = () => {
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
      title: '5 Common Plumbing Issues Ottawa Homeowners Face — And How to Fix Them',
      description: 'Learn the quickest ways to handle leaks, clogs, and low water pressure before the problem get...',
      image: serviceImg1,
      cta: 'Read More'
    },
    {
      title: 'How to Prevent Frozen Pipes in Ottawa’s Cold Winters',
      description: 'Simple preventive steps that save you from expensive repairs when temperatures drop.',
      image: articleImg2,
      cta: 'Read More'
    },
    {
      title: 'Water Heater Not Working? Here’s When to Repair vs. Replace',
      description: 'A practical guide to understanding your water heater’s lifespan and choosing the cost-effective ...',
      image: serviceImg3,
      cta: 'Read More'
    }
  ];

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="ServicesContainer">
        <div className="section-header" ref={headerRef}>
          <div className="hero-badge">
            Articles
          </div>
          <h2>We provide the best comprehensive plumbing solutions in Ottawa</h2>
        </div>
        
        <div className="services-grid article-grid">
          <div className="grid-wrapper">
            {services.map((service, index) => (
              <div 
                className="service-card" 
                key={index}
                ref={addToRefs}
              >
                <div className="service-content article-content">
                <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                 
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

export default Articles;
