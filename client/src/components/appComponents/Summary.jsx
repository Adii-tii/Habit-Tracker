import React from "react";
import { Flame, CheckCircle } from "lucide-react";

const TodaysSummary = ({ currentDate, completed = 3, total = 5, streak = 4 }) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Hello Looper 👋</h2>
          <p className="text-sm text-gray-500">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Mini Progress Badge */}
        <div className="flex flex-col items-end">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            {completed} / {total} Habits
          </div>
          <div className="text-xs text-gray-500 mt-1">{percentage}% done</div>
        </div>
      </div>

      {/* Streak & Progress */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {/* Streak */}
        <div className="flex items-center bg-yellow-50 rounded-lg p-4 shadow-sm">
          <Flame className="text-yellow-500 w-6 h-6 mr-3" />
          <div>
            <p className="text-sm text-gray-700">Current Streak</p>
            <p className="text-base font-semibold text-gray-800">{streak} Days</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysSummary;
