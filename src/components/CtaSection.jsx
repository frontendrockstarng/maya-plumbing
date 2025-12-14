import React, { useRef, useState, useEffect } from 'react';
import '../App.css';

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
      { threshold: 0.16 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);
  return [ref, visible];
}

const CtaSection = () => {
  // Reveal hooks for staggered animation
  const [leftRef, leftVisible] = useRevealOnScroll(0);
  const [cardRef, cardVisible] = useRevealOnScroll(100);
  const [titleRef, titleVisible] = useRevealOnScroll(200);
  const [descRef, descVisible] = useRevealOnScroll(300);
  const [formRef, formVisible] = useRevealOnScroll(400);
  const [btnRef, btnVisible] = useRevealOnScroll(500);

  return (
    <section className="cta-section">
      <div className="cta-container">
       
        {/* Right: Card */}
        <div
          ref={cardRef}
          className={`cta-card scroll-reveal${cardVisible ? ' revealed' : ''}`}
          style={{transitionDelay: '100ms'}}
        >
         
          <form
            ref={formRef}
            className={`cta-form scroll-reveal${formVisible ? ' revealed' : ''}`}
            style={{transitionDelay: '400ms'}}
            onSubmit={e => e.preventDefault()}
          >
             <h2
            ref={titleRef}
            className={`cta-card-title scroll-reveal${titleVisible ? ' revealed' : ''}`}
            style={{transitionDelay: '200ms'}}
          >Get free consultation</h2>
          <div
            ref={descRef}
            className={`cta-card-desc scroll-reveal${descVisible ? ' revealed' : ''}`}
            style={{transitionDelay: '300ms'}}
          >
            Our licensed plumbers in Ottawa deliver fast, reliable, and affordable services tailored to your needs.
          </div>
            <label className="cta-label">Full Name
              <input className="cta-input" type="text" placeholder="Jane Smith" required />
            </label>
            <label className="cta-label">Email
              <input className="cta-input" type="email" placeholder="janesmith@gmail.com" required />
            </label>
            <label className="cta-label">Select Service
              <select className="cta-input" defaultValue="Residential Plumbing, Commercial, Kitchen">
                <option disabled>Select Option</option>
                <option>Emergency Repairs</option>
                <option>Bathroom Renovation</option>
                <option>Water Heater</option>
                <option>Other</option>
              </select>
            </label>
            <label className="cta-label">Tell us more
              <textarea className="cta-input" placeholder="How can we help? Describe your problem" rows={2} />
            </label>
            <button
              ref={btnRef}
              className={`cta-btn scroll-reveal${btnVisible ? ' revealed' : ''}`}
              style={{transitionDelay: '500ms'}}
              type="submit"
            >
              Request Assistance &nbsp;⟶
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
