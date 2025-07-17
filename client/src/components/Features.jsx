import React from "react";
import calendar from '../assets/calendar.png';
import tasks from '../assets/tasks.png';
import streaks from '../assets/streaks.png';
import note from '../assets/note.png';

import{
    Calendar, 
    Target, 
    Bell, 
    BookOpen, 
} from 'lucide-react';


function features() {
    return(
        <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              It's really <span className="text-yellow-500">simple.</span>
            </h2>
            <p className="text-xl text-gray-600">Here's how it works!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Track your progress at a glance
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Get a comprehensive overview of all your habits in one intuitive dashboard. See your streaks, completion rates, and patterns that help you stay motivated and consistent.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Daily habit tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Progress visualization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Bell className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Smart reminders</span>
                </div>
              </div>
            </div>
            <div className=" rounded-lg p-8 h-96 flex items-center justify-center">
              <img src={calendar} alt="Dashboard overview showing habit tracking interface" className="rounded-lg shadow-lg w-90 h-auto" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className=" rounded-lg p-8 h-96 flex items-center justify-center order-2 lg:order-1">
              <img src={streaks} alt="Habit statistics and progress charts" className="shadow-lg" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Set flexible goals instead of streaks
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Break free from the pressure of perfect streaks. Set realistic, flexible goals that adapt to your lifestyle and celebrate progress over perfection.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Customizable targets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Flexible scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Progress insights</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Make notes to reflect on your journey
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Capture your thoughts, insights, and reflections as you build new habits. Understanding your patterns and triggers is key to lasting change.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Daily reflections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Progress tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Bell className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Mindful check-ins</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg p-8 h-96 flex items-center justify-center">
              <img src={note} className="rounded-lg" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className=" rounded-lg p-8 h-96 flex items-center justify-center order-2 lg:order-1">
              <img src={tasks} alt="Analytics dashboard showing habit patterns" className="rounded-lg shadow-lg" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Analyze patterns to optimize your routine
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Discover what works best for you with detailed analytics and insights. Identify your peak performance times and optimize your daily routine for maximum success.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Performance analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Timing optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="text-yellow-500 w-6 h-6" />
                  <span className="text-gray-700">Detailed reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default features;