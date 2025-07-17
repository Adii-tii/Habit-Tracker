import React from "react";

function Pricing() {
    return(
        <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start your journey to better habits today</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <div className="text-4xl font-bold mb-2">$0<span className="text-lg font-normal text-gray-600">/month</span></div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Basic habit tracking
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  5 habits maximum
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Mobile app access
                </li>
              </ul>
              <div className="pb-1">
                <button className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105">
                Get Started Free
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-yellow-500 hover:border-yellow-600 transition-all duration-300 transform hover:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="text-4xl font-bold mb-2">$12<span className="text-lg font-normal text-gray-600">/month</span></div>
                <p className="text-gray-600">For serious habit builders</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Unlimited habits
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Smart reminders
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Data export
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105">
                Start Pro Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Pricing;