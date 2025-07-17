import React from "react";

import { 
    Mail, 
    Phone, 
    MapPin, 
    Github, 
    Linkedin, 
    Twitter } 
    from 'lucide-react';

function Contact(){
    return(
        <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">hello@loopin.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">123 Habit Street, Success City, SC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-semibold mb-2">Follow Us</h4>
                  <p className="text-gray-600 mb-4">Stay updated with our latest features and tips</p>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-semibold mb-2">Quick Support</h4>
                  <p className="text-gray-600 mb-4">Need help? We're here for you</p>
                  <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105">
                    Get Help Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Contact;