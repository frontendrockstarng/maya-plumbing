import { useRef, useState, useEffect } from 'react';
import '../App.css'

// Custom hook for count up animation
function useCountUpWhenVisible(target, end, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          setStarted(true);
          hasStarted.current = true;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!started) return;
    let startTimestamp = null;
    let raf;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return count;
}

// MetricCount component
import { useMemo } from 'react';
function MetricCount({ value, suffix, label }) {
  const ref = useRef();
  // Memoize duration so it is stable for each instance
  const duration = useMemo(() => 1500 + Math.floor(Math.random() * 500), []);
  const count = useCountUpWhenVisible(ref, value, duration);
  // Format with commas
  const formatted = count.toLocaleString();
  return (
    <div className="metric-item">
      <div className="metric-value" ref={ref}>{formatted}{suffix}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}

const About = () => {

 const headerRef = useRef(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  

    return (
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-content">
          <div 
            ref={headerRef} 
            className="about-header"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }}
          >
            <div className="hero-badge">
              Proven Results
            </div>
            <h2 className="section-title left-title">Trusted by residents & homeowners across Ottawa.</h2>
            <p className="about-description">
              With over 15 years of experience, we've been providing top-quality plumbing services to homes and businesses across Ottawa. 
              Our team of certified plumbers is committed to delivering exceptional workmanship and outstanding customer service.
            </p>
          </div>
            
            <div className="metrics-grid">
              <MetricCount value={15} suffix="+" label="Years Experience" />
              <MetricCount value={5000} suffix="+" label="Projects Completed" />
              <MetricCount value={98} suffix="%" label="Customer Satisfaction" />
              <MetricCount value={300} suffix="+" label="Returning Customers" />
            </div>
            
            {/* <button className="primary-button">Learn More About Us</button> */}
          </div>
{/*           
          <div className="about-image">
            <img src="/images/plumber-working.jpg" alt="Professional plumber at work" />
          </div> */}
        </div>
      </section>
    );
  };
  
  export default About;