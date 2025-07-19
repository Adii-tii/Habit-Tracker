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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loading screen before navigating
  const handleSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200); // 1.2s loading
  };

  // Switch between modals
  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };
  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        Scrolled={isScrolled}
        onLoginClick={openLogin}
        onSignupClick={openSignup}
      />

      <Hero onStart={openSignup} />
      <Features />
      <About />
      <Pricing />
      <CTA onStart={openSignup}/>
      <Contact />
      <Footer />

      {isLoginOpen && (
        <AuthModal type="login"
          onClose={() => setIsLoginOpen(false)}
          onSuccess={handleSuccess}
          onSwitch={openSignup}
        />
      )}
      {isSignupOpen && (
        <AuthModal type="signup"
          onClose={() => setIsSignupOpen(false)}
          onSuccess={handleSuccess}
          onSwitch={openLogin}
        />
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl">
            <div className="loader mb-4 w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-lg font-semibold text-yellow-600">Loading your dashboard...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
