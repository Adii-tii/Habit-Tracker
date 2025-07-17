import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const generateCalendar = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const weeks = [];
  let week = Array(startingDayOfWeek).fill(null);
  
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push([...week]);
      week = [];
    }
  }
  
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  
  return weeks;
};


const CalendarCard = ({ currentDate }) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const calendarWeeks = generateCalendar(currentDate);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarWeeks.map((week, weekIndex) => 
          week.map((day, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`} className="aspect-square">
              {day && (
                <div className={`w-full h-full flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${
                  day === currentDate.getDate() ? 'bg-yellow-500 text-black' : 
                  day === 15 ? 'bg-gray-100 text-gray-700' : 'hover:bg-gray-100'
                }`}>
                  {day}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-600">Streak day</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
};


export default CalendarCard;