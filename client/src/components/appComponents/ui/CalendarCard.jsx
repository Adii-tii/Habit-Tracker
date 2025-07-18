import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const getWeekDates = (startDate) => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    const next = new Date(startDate);
    next.setDate(startDate.getDate() + i);
    week.push(next);
  }
  return week;
};

const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

const CalendarCard = ({ currentDate }) => {
  const [weekStart, setWeekStart] = useState(getStartOfWeek(currentDate));

  const weekDates = getWeekDates(weekStart);
  const today = new Date();

  const handlePrev = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() - 7);
    setWeekStart(newStart);
  };

  const handleNext = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStart(newStart);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          {weekStart.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </h3>
        <div className="flex space-x-2">
          <button onClick={handlePrev} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft size={18} />
          </button>
          <button onClick={handleNext} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-medium">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDates.map((date, idx) => (
          <div
            key={idx}
            className={`aspect-square flex items-center justify-center rounded-md text-sm cursor-pointer
              ${isSameDay(date, today)
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-100 text-gray-700"}
            `}
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span>Streak day</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
