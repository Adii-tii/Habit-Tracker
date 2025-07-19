import React, { useState, useEffect } from "react";
import { BarChart, Flame } from "lucide-react";

const WeeklyOverview = ({ weeklyProgress = [] }) => {
  const [barHeights, setBarHeights] = useState(Array(weeklyProgress.length).fill(0));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBarHeights(weeklyProgress.map(day => day.completion));
    }, 50);
  }, [weeklyProgress]);

  return (
    <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-200 ">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-100">Weekly Overview</h2>
          <div className="flex items-center space-x-1">
            <Flame size={16} className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-100">7 days</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">Keep it up!</p>
      </div>
      <div className=" rounded-lg">
        <div className="flex items-end justify-between h-24 space-x-2 pt-[150px]">
          {weeklyProgress.map((day, index) => (
            <div
              key={day.day}
              className="flex flex-col items-center flex-1 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Yellow percentage badge only on hover */}
              <div className="mb-2 h-6 flex items-center justify-center" style={{ minHeight: 24 }}>
                {hoveredIndex === index && (
                  <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow transition-all duration-300" style={{ minWidth: 32, textAlign: 'center' }}>
                    {barHeights[index]}%
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-800 rounded-t relative" style={{ height: '120px' }}>
                <div
                  className="bg-yellow-500 rounded-t absolute bottom-0 w-full transition-all duration-700 hover:scale-105 hover:bg-yellow-600"
                  style={{ height: `${barHeights[index]}%` }}
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