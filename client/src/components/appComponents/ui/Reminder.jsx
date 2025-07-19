import React from "react";
import { Trash } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr; // fallback if not ISO
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

const Reminders = ({ reminders, loading, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Reminders</h3>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 border border-gray-200 relative">
              <div className="absolute left-0 top-2 bottom-2 w-1 rounded bg-yellow-200" style={{ minHeight: 32 }} />
              <div className="flex-1 min-w-0 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-3 w-10 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
              <div className="ml-4 w-6 h-6 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      ) : reminders.length === 0 ? (
        <div className="text-center text-gray-400 py-8 text-lg font-semibold">
          🕒 No reminders yet! Add one to stay on track.
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder, idx) => (
            <div key={reminder._id || reminder.id || idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100 relative">
              {/* Yellow vertical bar */}
              <div className="absolute left-0 top-2 bottom-2 w-1 rounded bg-yellow-400" style={{ minHeight: 32 }} />
              <div className="flex-1 min-w-0 pl-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">{formatDate(reminder.date)}</span>
                  <span className="text-xs text-gray-400">{reminder.time}</span>
                </div>
                <div className="font-semibold text-gray-900 truncate">{reminder.title}</div>
                <div className="text-xs text-gray-500 truncate">{reminder.type}</div>
              </div>
              {onDelete && (
                <button
                  className="ml-4 p-2 rounded hover:bg-red-50 group"
                  title="Delete reminder"
                  onClick={() => onDelete(reminder._id)}
                >
                  <Trash size={18} className="text-gray-400 group-hover:text-red-500 transition" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reminders;