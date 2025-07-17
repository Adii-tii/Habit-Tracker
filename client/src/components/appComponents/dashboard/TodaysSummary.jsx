import React from "react";
import { Flame } from "lucide-react";

const TodaysSummary = ({ habits = [], streakCount = 0 }) => {
  const today = new Date();
  const completedToday = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="bg-yellow-400 rounded-xl p-6 text-gray-900">
      <h3 className="font-semibold mb-2">Today's Progress</h3>
      <div className="text-2xl font-bold mb-4">
        {today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
      </div>

      <div className="space-y-3">
        <div className="bg-yellow-500 rounded-lg p-3">
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