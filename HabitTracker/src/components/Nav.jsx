import React from "react";
import logo from '../assets/logo.png'

function Navbar({Scrolled}){
    return(
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        Scrolled 
          ? 'bg-white shadow-md py-4' 
          : 'bg-transparent py-4'
      }`}>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-yellow-500">
                <img className="w-20 h-auto" src={logo}></img>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-10 items-center">
              <a href="#features" className="text-gray-700 hover:text-yellow-500 transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-yellow-500 transition-colors duration-200 font-medium">
                About Us
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-yellow-500 transition-colors duration-200 font-medium">
                Pricing
              </a>
              <a href="#contact" className="text-gray-700 hover:text-yellow-500 transition-colors duration-200 font-medium">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-yellow-500 transition-colors duration-200 font-medium"
              >
                Log In
              </button>
              <button className="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;