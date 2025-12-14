import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import WhychooseUs from '../assets/img/WhyChooseUs1.png'

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

const features = [
  {
    icon: '🏆',
    title: 'Experienced & Licensed Experts',
  },
  {
    icon: '⏱️',
    title: '24/7 Fast Emergency Response',
  },
  {
    icon: '💸',
    title: 'Transparent Pricing',
  },
];

const WhyChooseUs = () => {
  // Reveal hooks for all elements
  const [imgRef, imgVisible] = useRevealOnScroll(0);
  const [badgeRef, badgeVisible] = useRevealOnScroll(150);
  const [headingRef, headingVisible] = useRevealOnScroll(250);
  const featureDelays = [350, 450, 550];
  const buttonDelay = 700;

  return (
    <section className="why-choose-section">
      <div className="why-choose-container">
        {/* Left: Image */}
        <div 
          ref={imgRef}
          className={`why-choose-img-wrapper scroll-reveal${imgVisible ? ' revealed' : ''}`}
        >
          <img
            src={WhychooseUs}
            alt="Why Choose Maya Plumbing"
            className="why-choose-img"
          />
        </div>

        {/* Right: Content */}
        <div className="why-choose-content-col">
          <div
            ref={badgeRef}
            className={`why-choose-badge scroll-reveal${badgeVisible ? ' revealed' : ''}`}
          >Why Choose Us</div>

          <h2
            ref={headingRef}
            className={`why-choose-heading scroll-reveal${headingVisible ? ' revealed' : ''}`}
          >What makes us the right choice for you</h2>

          <div className="why-choose-features-grid">
            {features.map((feat, i) => {
              const [ref, vis] = useRevealOnScroll(featureDelays[i]);
              return (
                <div
                  key={feat.title}
                  ref={ref}
                  className={`why-choose-feature scroll-reveal${vis ? ' revealed' : ''}`}
                  style={{ transitionDelay: `${featureDelays[i]}ms` }}
                >
                  <span className="why-choose-feature-icon">{feat.icon}</span>
                  <span>{feat.title}</span>
                </div>
              );
            })}
            {/* Call Us Now cell */}
            <div className="why-choose-call-cell">
              <span className="why-choose-call-label">Call us now</span>
              <RevealButton delay={buttonDelay} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function RevealButton({ delay }) {
  const [ref, visible] = useRevealOnScroll(delay);
  return (
    <a
      ref={ref}
      href="tel:+16136140064"
      className={`why-choose-call-btn scroll-reveal${visible ? ' revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      +1-613-614-0064
    </a>
  );
}

export default WhyChooseUs;
