import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

function Hero({onStart}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="hero-section pt-48 pb-20 relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-60">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-30 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 235, 59, 0.4) 0%, transparent 70%)',
            top: '60%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-25 blur-xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 193, 7, 0.5) 0%, transparent 70%)',
            top: '30%',
            left: '70%',
            animation: 'float 30s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-orange-400 rotate-45 opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-amber-400 rounded-full opacity-70 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/3 w-5 h-5 bg-yellow-500 rotate-12 opacity-40 animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-800">
          <span className="inline-block px-auto py-2 mr-2">
            Loop In
          </span>{" "}
          to Better{" "}
          <span className="inline-block text-yellow-500 px-3 py-1">
            <TypeAnimation
              sequence={[
                "Habits", 2000,
                "Focus", 2000,
                "Discipline", 2000,
                "Routines", 2000,
                "Energy", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </span>
        </h1>

        <p className="text-3xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build your routine. One small loop at a time.
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
          Track your daily habits with ease. Stay consistent, celebrate progress, and create the life you want – to improve is just human; the key is to keep improving.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          onClick={onStart}>
            Start Looping
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-yellow-500 hover:text-yellow-500 transition-all duration-200 transform hover:scale-105">
            How it works?
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          33% { 
            transform: translateY(-30px) rotate(2deg) scale(1.05); 
          }
          66% { 
            transform: translateY(15px) rotate(-1deg) scale(0.95); 
          }
        }
        
        .hero-section {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 193, 7, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 235, 59, 0.08) 0%, transparent 50%);
        }
      `}</style>
    </section>
  );
}

export default Hero;
