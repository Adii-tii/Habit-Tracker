import React from "react";

function cta({onStart}) {
    return(
        <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get started for the rest of your life,
          </h2>
          <h3 className="text-4xl font-bold text-white mb-8">
            today with,
          </h3>
          <h4 className="text-6xl font-bold text-white mb-12">
            <span className="text-yellow-100">loop in.</span>
          </h4>
          <button className="bg-white text-yellow-500 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          onClick = {onStart}>
            Start Your Journey
          </button>
        </div>
      </section>
    )
}

export default cta;