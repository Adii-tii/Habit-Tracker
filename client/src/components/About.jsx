import React from "react";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import photo from "../assets/dev.jpg";

function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-10">Meet the Developer</h2>

          <div className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={photo}
                alt="photu"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold">Aditi Avinash Sable</h3>

            <p className="text-gray-600 text-base">
              ML Engineer | UI/UX Designer | Full-Stack Developer | Data Engineer
            </p>

            <p className="text-sm text-gray-500 italic max-w-md text-center px-4">
              Yoo, I'm Aditi — I build cool stuff and sometimes even remember how it works.
              If it breaks, it was probably a feature all along.
            </p>

            <div className="flex space-x-6 pt-4">
              <a
                href="https://github.com/Adii-tii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditi-avinash-sable-081978291/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/adiiiiii_ti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="mailto:sableaditi8@gmail.com"
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
