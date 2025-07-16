import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Pricing from './components/Pricing';
import Hero from './components/Hero';
import Navbar from './components/Nav';

const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);  

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar Scrolled={isScrolled} /> 
      <Hero />
      <Features/>
      <About/>
      <Pricing />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Homepage;