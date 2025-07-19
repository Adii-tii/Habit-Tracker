import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Pricing from './components/Pricing';
import Hero from './components/Hero';
import Navbar from './components/Nav';
import AuthModal from './components/AuthModal';

const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        Scrolled={isScrolled}
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />

      <Hero onStart = {handleSuccess}/>
      <Features />
      <About />
      <Pricing />
      <CTA onStart={handleSuccess}/>
      <Contact />
      <Footer />

      {isLoginOpen && (
        <AuthModal type="login" 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={handleSuccess}
        />
      )}
      {isSignupOpen && (
        <AuthModal type="signup" 
        onClose={() => setIsSignupOpen(false)} 
        onSuccess={handleSuccess}/>
      )}
    </div>
  );
};

export default Homepage;
