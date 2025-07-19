import React, { useState, useEffect, useRef } from "react";
import { Flame } from "lucide-react";

const TodaysSummary = ({ habits = [], streakCount = 0 }) => {
  const [barWidth, setBarWidth] = useState(0);
  const today = new Date();
  const completedToday = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const animTimeout = useRef();

  // On mount or when completionRate changes, fill to correct percentage
  useEffect(() => {
    setBarWidth(completionRate);
    return () => clearTimeout(animTimeout.current);
  }, [completionRate]);

  // On hover, animate from 0 to completionRate
  const handleMouseEnter = () => {
    setBarWidth(0);
    animTimeout.current = setTimeout(() => setBarWidth(completionRate), 20);
  };
  // On leave, immediately fill to correct percentage
  const handleMouseLeave = () => {
    clearTimeout(animTimeout.current);
    setBarWidth(completionRate);
  };

  return (
    <div className="bg-yellow-400 rounded-xl p-6 pb-4 text-gray-900">
      <h3 className="font-semibold mb-2">Today's Progress</h3>
      <div className="text-2xl font-bold mb-4">
        {today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
      </div>
      <div className="space-y-3">
        {/* Habits Completed Fill Animation */}
        <div
          className="relative overflow-hidden rounded-lg cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute inset-0 bg-yellow-500 transition-all duration-700 ease-in-out"
            style={{
              width: `${barWidth}%`,
              transformOrigin: 'left',
              zIndex: 0,
            }}
          />
          <div className="relative z-10 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Habits Completed</p>
                <p className="text-sm opacity-90">{completedToday} of {totalHabits} habits</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{completionRate}%</div>
              </div>
            </div>
          </div>
        </div>
        {/* Streak Card */}
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Current Streak</p>
              <p className="text-sm opacity-90">Keep it up!</p>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5" />
              <span className="text-xl font-bold">{streakCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysSummary;
