import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import googleIcon from '../assets/img/google-icon.svg'

const testimonials = [
  {
    type: 'Pipe Leakage',
    text:
      "Ryan, the owner of Maya plumbing called me to discuss the work that we needed. He is friendly, professional, and super knowledgeable. His quote for the plumbing job was very reasonable, compared to other local plumbing companies and it included all materials and labor.",
    name: 'Addrienne Armstrong',
    rating: 5.0,
    stars: 5,
  },
  {
    type: 'Pipe Leakage',
    text:
      "I highly recommend Maya Plumbing! Ryan was so efficient and thorough, replacing 3 broken toilets in my home. He did an amazing job! Clean, professional, skilled, and great communication. And the price was exceptionally fair. Would definitely recommend! Thank you so much, Ryan!!",
    name: 'Sandra Stewart',
    rating: 4.7,
    stars: 5,
  },
  {
    type: 'Drain Cleaning',
    text:
      "Great service, quick response and very professional. Would use again!",
    name: 'Michael Chen',
    rating: 5.0,
    stars: 5,
  },
  {
    type: 'Emergency Repair',
    text:
      "Fast and reliable! Fixed our burst pipe at midnight. Thank you Maya Plumbing!",
    name: 'Lisa Gomez',
    rating: 5.0,
    stars: 5,
  },
  {
    type: 'Water Heater',
    text:
      "Maya Plumbing installed my new water heater quickly and left everything spotless. The team was courteous and explained everything clearly!",
    name: 'David R.',
    rating: 5.0,
    stars: 5,
  },
  {
    type: 'Bathroom Renovation',
    text:
      "Excellent craftsmanship and attention to detail. Our bathroom looks amazing. Highly recommend Maya Plumbing for renovations!",
    name: 'Priya S.',
    rating: 4.9,
    stars: 5,
  },
  {
    type: 'Sump Pump',
    text:
      "Very knowledgeable and honest. They replaced our sump pump and gave us tips to keep it running smoothly. A+ service!",
    name: 'Tommy Lee',
    rating: 5.0,
    stars: 5,
  },
  {
    type: 'Kitchen Plumbing',
    text:
      "We had a leak under our kitchen sink. Maya Plumbing fixed it the same day. Friendly and efficient!",
    name: 'Emily Watson',
    rating: 4.8,
    stars: 5,
  },
];

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
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return [ref, visible];
}

const CAROUSEL_INTERVAL = 4000; // ms

const Testimonials = () => {
  const [sectionRef, sectionVisible] = useRevealOnScroll(0);
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 1 : 2);
  const totalSlides = Math.ceil(testimonials.length / perPage);
  const autoplayRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth < 768 ? 1 : 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (isPaused) return;
    autoplayRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, totalSlides]);

  // Pause on hover logic
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Get current testimonials for this slide
  const startIdx = slide * perPage;
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + perPage);
  // If at the end and not enough for 2, wrap around
  if (visibleTestimonials.length < perPage) {
    visibleTestimonials.push(...testimonials.slice(0, perPage - visibleTestimonials.length));
  }

  return (
    <section className="testimonials-section" ref={sectionRef} id="testimonials">
      <div className="testimonials-badge scroll-reveal" style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)' }}>
        Testimonials
      </div>
      <h2 className="testimonials-heading scroll-reveal" style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)' }}>
        Top-rated plumbing<br />services in Ottawa
      </h2>
      <div className="testimonials-cards-row">
        {visibleTestimonials.map((t, idx) => (
          <TestimonialCard
            key={startIdx + idx}
            visible={sectionVisible}
            {...t}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className="testimonials-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`dot${i === slide ? ' active' : ''}`}
            onClick={() => setSlide(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </section>
  );
};


const TestimonialCard = React.forwardRef(({ type, text, name, rating, stars, visible, onMouseEnter, onMouseLeave }, ref) => (
  <div
    ref={ref}
    className={`testimonial-card scroll-reveal${visible ? ' revealed' : ''}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="testimonial-type">{type}</div>
    <hr className="testimonial-divider" />
    <div className="testimonial-text">{text}</div>
    <hr className="testimonial-divider" />
    <div className="testimonial-bottom-row">
      <span className="testimonial-name">{name}</span>
      <span className="testimonial-google">
        <img src={googleIcon} alt="Google" className="testimonial-google-icon" />
        <span className="testimonial-rating">{rating.toFixed(1)}</span>
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} className="testimonial-star">★</span>
        ))}
      </span>
    </div>
  </div>
));

export default Testimonials;
