import React from "react";
import{
    Twitter,
    Github,
    Linkedin
} from 'lucide-react';


function aboutUs(){
    return(
        <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">Meet the developer</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-yellow-500 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">AS</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Aditi Avinash Sable</h3>
              <p className="text-gray-600 mb-6">ML Engineer | UI/UX Designer | Full-Stack Developer | Data Engineer</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default aboutUs;