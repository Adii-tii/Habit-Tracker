import React from "react";
import { CheckCircle, Play, Pause, Timer, Trash, Flame } from "lucide-react";
import formatTime from "../../../utilityFunctions/formatTIme";


const HabitItem = ({ habit, toggleTimer, timerActive, timerSeconds, toggleCompletion, showHistory }) => {
  {/* This habit will have an userId,name, category, progress, streak, time, completed, difficulty , priority, timespent, notes, targetTime, type, */}

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <button 
            onClick={() => toggleCompletion(habit.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              habit.completed ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300 hover:border-yellow-500'
            }`}
          >
            {habit.completed && <CheckCircle size={14} className="text-black" />}
          </button>
          <div className="grid grid-cols-2">
            <h3 className="font-medium text-gray-900">{habit.name}</h3>
            
            <div className="pl-5 space-x-2"> 
                <span className={`text-xs px-2 py-1 rounded-full ${
                  habit.category === 'learning' ? 'bg-purple-100 text-purple-700' :
                  habit.category === 'health' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {habit.category}
                </span>
              
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(habit.priority)}`}>
                  {habit.priority}
                </span>
            </div>

            <p className="text-sm text-gray-500 mb-2 mt-1">{habit.notes}</p>
            
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {habit.targetTime > 0 && (
            <button 
              onClick={() => toggleTimer(habit.id)}
              className={`p-2 rounded-lg transition-colors ${
                timerActive === habit.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {timerActive === habit.id ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
          
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Trash size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${habit.progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{habit.progress}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame size={14} className="text-yellow-500" />
            <span className="text-xs font-medium">{habit.streak}</span>
          </div>
          
          {habit.targetTime > 0 && (
            <div className="flex items-center space-x-1">
              <Timer size={14} className="text-gray-400" />
              <span className="text-xs">
                {timerActive === habit.id ? formatTime(timerSeconds) : formatTime(habit.timeSpent)}
                /{formatTime(habit.targetTime)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default HabitItem;
