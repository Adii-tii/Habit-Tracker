import React, { useState } from 'react';

const NUM_DAYS = 365;
const today = new Date();

// Helper function to subtract days
const subDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// Helper function to format date
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Helper function to get day of week (0 = Sunday, 6 = Saturday)
const getDayOfWeek = (date) => {
  return date.getDay();
};

// Generate dummy data
const generateActivityData = () => {
  const data = {};
  for (let i = 0; i < NUM_DAYS; i++) {
    const date = formatDate(subDays(today, i));
    const count = Math.floor(Math.random() * 5); // max 4 activities/day
    if (count > 0) {
      data[date] = {
        count,
        events: Array.from({ length: count }, (_, idx) => `Activity ${idx + 1}`)
      };
    }
  }
  return data;
};

const activityData = generateActivityData();

const getColor = (count) => {
  if (count === 0) return 'bg-gray-200';
  if (count === 1) return 'bg-yellow-200';
  if (count === 2) return 'bg-yellow-400';
  if (count === 3) return 'bg-yellow-600';
  return 'bg-yellow-800';
};

const getColorIntensity = (count) => {
  if (count === 0) return 'No activities';
  if (count === 1) return 'Low activity';
  if (count === 2) return 'Medium activity';
  if (count === 3) return 'High activity';
  return 'Very high activity';
};

const CalendarHeatmap = () => {
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleMouseEnter = (date, activity, event) => {
    const rect = event.target.getBoundingClientRect();
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    setTooltip({
      show: true,
      content: `${activity.count} activities on ${formattedDate}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredDate(date);
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: '', x: 0, y: 0 });
    setHoveredDate(null);
  };

  // Create the grid - we'll use weeks as columns
  const weeks = [];
  let currentWeek = [];
  
  // Start from the oldest date
  for (let i = NUM_DAYS - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const dateStr = formatDate(date);
    const dayOfWeek = getDayOfWeek(date);
    const activity = activityData[dateStr] || { count: 0, events: [] };
    
    // If this is the first day and it's not Sunday, add empty cells
    if (i === NUM_DAYS - 1 && dayOfWeek !== 0) {
      for (let j = 0; j < dayOfWeek; j++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push({
      date: dateStr,
      activity,
      dayOfWeek
    });
    
    // If we've completed a week (Sunday to Saturday) or this is the last day
    if (dayOfWeek === 6 || i === 0) {
      // Fill the rest of the week if needed
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Activity Calendar</h1>
      </div>
      {/* Calendar Container */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        {/* Month labels */}
        <div className="flex mb-2 ml-8">
          {monthLabels.map((month, idx) => (
            <div key={month} className="text-xs text-gray-500 mr-8 first:ml-0">
              {month}
            </div>
          ))}
        </div>
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col mr-2">
            {dayLabels.map((day, idx) => (
              <div key={day} className="text-xs text-gray-500 h-3 mb-1 flex items-center">
                {idx % 2 === 1 ? day : ''}
              </div>
            ))}
          </div>
          {/* Heatmap Grid */}
          <div className="flex flex-wrap">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col mr-1">
                {week.map((day, dayIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`w-3 h-3 mb-1 rounded-sm cursor-pointer border border-gray-300 ${
                      day ? getColor(day.activity.count) : 'bg-transparent border-transparent'
                    } ${hoveredDate === day?.date ? 'ring-2 ring-yellow-500' : ''}`}
                    onMouseEnter={(e) => day && handleMouseEnter(day.date, day.activity, e)}
                    onMouseLeave={handleMouseLeave}
                    title={day ? `${day.activity.count} activities on ${day.date}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm border border-gray-300 ${getColor(level)}`}
                  title={getColorIntensity(level)}
                />
              ))}
            </div>
            <span>More</span>
          </div>
          <div className="text-sm text-gray-500">
            {Object.values(activityData).reduce((sum, day) => sum + day.count, 0)} activities in the last year
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {Object.keys(activityData).length}
          </div>
          <div className="text-sm text-gray-600">Active days</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {Object.values(activityData).reduce((sum, day) => sum + day.count, 0)}
          </div>
          <div className="text-sm text-gray-600">Total activities</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round((Object.keys(activityData).length / NUM_DAYS) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Activity rate</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(Object.values(activityData).reduce((sum, day) => sum + day.count, 0) / Object.keys(activityData).length) || 0}
          </div>
          <div className="text-sm text-gray-600">Avg per active day</div>
        </div>
      </div>
      {/* Custom Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default CalendarHeatmap;
