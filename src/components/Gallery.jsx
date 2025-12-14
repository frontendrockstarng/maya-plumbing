import React, { useState, useRef, useEffect } from 'react';
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
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);
  return [ref, visible];
}

// Import images at the top
import img1 from '../assets/img/galleryImg1.png';
import img2 from '../assets/img/galleryImg2.png';
import img3 from '../assets/img/galleryImg3.png';
import img4 from '../assets/img/galleryImg4.png';
import img5 from '../assets/img/galleryImg5.png';
import img6 from '../assets/img/galleryImg6.png';
import img7 from '../assets/img/galleryImg1.png';

const images = [
  { src: img1, alt: 'Luxury shower renovation' },
  { src: img2, alt: 'Modern shower glass' },
  { src: img3, alt: 'Outdoor plumbing trench' },
  { src: img4, alt: 'Bathroom with black fixtures' },
  { src: img5, alt: 'Bathroom vanity and mirror' },
  { src: img6, alt: 'Bathroom with glass shower' },
  { src: img7, alt: 'Basement plumbing rough-in' },
];

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openModal = (idx) => {
    setCurrent(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const goto = (idx) => setCurrent(idx);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <section className="gallery-section">
      <div className="gallery-badge">Ottawa Plumbing Projects</div>
      <h2 className="gallery-heading">Real jobs, real results from homes<br/>across Ottawa.</h2>
      <div className="gallery-grid">
        <div className="grid-wrapper2">
        <div className="grid-row">
          {/* Main large image */}
          {(() => { const [ref, visible] = useRevealOnScroll(0); return (
            <div ref={ref} className={`gallery-grid-item gallery-grid-item-large lg-img scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '0ms'}} onClick={() => openModal(0)}>
              <img src={images[0].src} alt={images[0].alt} />
            </div>
          ); })()}
          {(() => { const [ref, visible] = useRevealOnScroll(100); return (
            <div ref={ref} className={`gallery-grid-item scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '100ms'}} onClick={() => openModal(1)}>
              <img src={images[1].src} alt={images[1].alt} />
            </div>
          ); })()}
        </div>

        <div className="grid-row">
          {(() => { const [ref, visible] = useRevealOnScroll(200); return (
            <div ref={ref} className={`gallery-grid-item item-Img3 scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '200ms'}} onClick={() => openModal(2)}>
              <img src={images[2].src} alt={images[2].alt} />
            </div>
          ); })()}
          {(() => { const [ref, visible] = useRevealOnScroll(300); return (
            <div ref={ref} className={`gallery-grid-item item-Img4 scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '300ms'}} onClick={() => openModal(3)}>
              <img src={images[3].src} alt={images[3].alt} />
            </div>
          ); })()}
          {(() => { const [ref, visible] = useRevealOnScroll(400); return (
            <div ref={ref} className={`gallery-grid-item item-Img5 scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '400ms'}} onClick={() => openModal(4)}>
              <img src={images[4].src} alt={images[4].alt} />
            </div>
          ); })()}
        </div>

        <div className="grid-row">
          {(() => { const [ref, visible] = useRevealOnScroll(500); return (
            <div ref={ref} className={`gallery-grid-item item-Img6 scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '500ms'}} onClick={() => openModal(4)}>
              <img src={images[4].src} alt={images[4].alt} />
            </div>
          ); })()}
          {(() => { const [ref, visible] = useRevealOnScroll(600); return (
            <div ref={ref} className={`gallery-grid-item item-Img7 scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '600ms'}} onClick={() => openModal(5)}>
              <img src={images[5].src} alt={images[5].alt} />
            </div>
          ); })()}
          {(() => { const [ref, visible] = useRevealOnScroll(700); return (
            <div ref={ref} className={`gallery-grid-item gallery-grid-item-cta scroll-reveal${visible ? ' revealed' : ''}`} style={{transitionDelay: '700ms', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start'}}>
              <div className="gallery-cta-text">See more projects<br/>in our gallery</div>
              <div className="grid-btn-grp">
                <button className="gallery-btn gallery-btn-view" onClick={() => openModal(0)}>View more ⟶</button>
                <a className="gallery-btn gallery-btn-service" href="#contact">Request Service ⟶</a>
              </div>
            </div>
          ); })()}
        </div>

        </div>
      
      </div>
      {/* Modal Carousel */}
      {modalOpen && (
        <div className="gallery-modal-overlay" onClick={closeModal}>
          <div className="gallery-modal" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeModal}>×</button>
            <div className="gallery-modal-main">
              <button className="gallery-modal-arrow left" onClick={prev}>‹</button>
              <img src={images[current].src} alt={images[current].alt} className="gallery-modal-img" />
              <button className="gallery-modal-arrow right" onClick={next}>›</button>
            </div>
            <div className="gallery-modal-thumbs">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  className={`gallery-modal-thumb${idx === current ? ' active' : ''}`}
                  onClick={() => goto(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
