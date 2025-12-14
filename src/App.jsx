import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import './App.css';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Articles from './components/Articles';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About/>
      <WhyChooseUs/>
      <Testimonials/>
      <Gallery />
      <Articles />
      <CtaSection />
      <Footer />
    </>
  );
}

export default App;
