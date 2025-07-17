import React from "react";
import { BarChart, Flame } from "lucide-react";

const WeeklyOverview = ({ weeklyProgress = [] }) => {
  return (
    <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-100">Weekly Overview</h2>
          <div className="flex items-center space-x-1">
            <Flame size={16} className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-100">15 days</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">Keep it up!</p>
      </div>
      <div className=" rounded-lg p-4">
        <div className="flex items-end justify-between h-24 space-x-2">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-gray-800 rounded-t relative" style={{ height: '80px' }}>
                <div
                  className="bg-yellow-500 rounded-t absolute bottom-0 w-full transition-all duration-300"
                  style={{ height: `${day.completion}%` }}
                ></div>
              </div>
              <span className="text-white text-xs mt-2">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyOverview;