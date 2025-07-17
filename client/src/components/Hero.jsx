import React from "react";
import { TypeAnimation } from "react-type-animation";

function Hero({onStart}) {
  return (
    <section className="pt-48 pb-20 bg-gradient-to-br from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
    </section>
  );
}

export default Hero;
