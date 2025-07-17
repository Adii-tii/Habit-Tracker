import React from "react";
import {
    Github,
    Linkedin,
    Twitter
} from 'lucide-react';

function Footer(){
    return(
        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">LOOP IN</h3>
              <p className="text-gray-400 mb-4">
                Building better habits, one loop at a time. Transform your life through consistent, meaningful actions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Mobile App</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">API Docs</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Loop In. All rights reserved. Built with love for better habits.
            </p>
          </div>
        </div>
      </footer>
    )
}

export default Footer;