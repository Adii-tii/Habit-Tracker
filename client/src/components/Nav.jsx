import React from "react";
import logo from "../assets/logo.png";

function Navbar({ Scrolled, onLoginClick, onSignupClick }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        Scrolled ? "bg-white/80 shadow-md py-4" : "bg-white/30 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-16 h-auto" src={logo} alt="Logo" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10 items-center">
            {["Features", "About Us", "Pricing", "Contact"].map((text, idx) => (
              <a
                key={idx}
                href={`#${text.toLowerCase().replace(" ", "")}`}
                className="relative group text-gray-700 font-medium transition-colors duration-200 hover:text-yellow-500"
              >
                {text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLoginClick}
              className="text-gray-700 font-medium hover:text-yellow-500 transition duration-200"
            >
              Log In
            </button>
            <button
              onClick={onSignupClick}
              className="bg-yellow-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
