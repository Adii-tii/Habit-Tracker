import React from "react";

const Reminders = ({ reminders }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Reminders</h3>
        <button className="text-gray-400 hover:text-gray-600 text-sm">see all</button>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-start space-x-3">
            <div className="bg-yellow-500 text-black rounded-lg p-2 min-w-[44px] text-center">
              <div className="text-lg font-bold">{reminder.date}</div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{reminder.title}</h4>
              <p className="text-sm text-gray-500">{reminder.time}</p>
              <p className="text-xs text-gray-400">{reminder.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Reminders;