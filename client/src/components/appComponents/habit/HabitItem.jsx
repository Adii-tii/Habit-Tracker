import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Play,
  Pause,
  Timer,
  Trash,
  Flame,
  Plus,
  Minus,
  Pencil,
  Book,
  Heart,
  List,
  Hash,
} from "lucide-react";
import formatTime from "../../../utilityFunctions/formatTIme";

const HabitItem = ({
  habit,
  timerActive,
  timerSeconds,
  toggleTimer,
  fetchHabits,
  setEditingHabit
}) => {
  const isTimerRunning = timerActive === habit._id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // --- Progress Calculation ---
  let progress = 0;
  if (habit.type === "counter" && habit.counterTarget > 0) {
    progress = Math.min(100, Math.round((habit.counterValue / habit.counterTarget) * 100));
  } else if (habit.type === "time" && habit.targetTime > 0) {
    progress = Math.min(100, Math.round((habit.timeSpent / habit.targetTime) * 100));
  } else {
    progress = habit.completed ? 100 : 0;
  }

  // --- Auto-complete logic ---
  useEffect(() => {
    if (habit.type === "counter" && habit.counterTarget > 0 && habit.counterValue >= habit.counterTarget && !habit.completed) {
      updateHabit({ completed: true });
    }
    if (habit.type === "time" && habit.targetTime > 0 && habit.timeSpent >= habit.targetTime && !habit.completed) {
      updateHabit({ completed: true });
    }
    // eslint-disable-next-line
  }, [habit.counterValue, habit.timeSpent]);

  const updateHabit = async (updates) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/api/habits/${habit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update habit");
      fetchHabits();
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const deleteHabit = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/api/habits/${habit._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchHabits();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete habit.");
    }
    setShowDeleteModal(false);
  };

  // --- Manual completion logic ---
  const toggleCompletion = () => {
    let updates = { completed: !habit.completed };
    if (!habit.completed) {
      if (habit.type === "counter") updates.counterValue = habit.counterTarget;
      if (habit.type === "time") updates.timeSpent = habit.targetTime;
    }
    updateHabit(updates);
  };

  const handleCounterChange = (increment = true) => {
    const newVal = increment
      ? habit.counterValue + 1
      : Math.max(0, habit.counterValue - 1);

    const updates = {
      counterValue: newVal,
      completed:
        habit.counterTarget > 0 && newVal >= habit.counterTarget
          ? true
          : habit.completed,
    };

    updateHabit(updates);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Tag icon mapping
  const getTagIcon = (tag) => {
    switch (tag) {
      case "learning":
        return <Book size={16} className="text-purple-600 mr-1" />;
      case "health":
        return <Heart size={16} className="text-green-600 mr-1" />;
      case "wellness":
        return <Flame size={16} className="text-yellow-500 mr-1" />;
      default:
        return <List size={16} className="text-gray-400 mr-1" />;
    }
  };

  // Type icon mapping
  const getTypeIcon = (type) => {
    switch (type) {
      case "time":
        return <Timer size={16} className="text-blue-500 mr-1" />;
      case "counter":
        return <Hash size={16} className="text-pink-500 mr-1" />;
      case "checklist":
      default:
        return <List size={16} className="text-gray-500 mr-1" />;
    }
  };

  return (
    <div className="mb-6 flex items-stretch bg-white rounded-2xl shadow-sm relative hover:shadow-md transition-all group">
      {/* Yellow sidebar accent */}
      <div className="w-2 rounded-l-2xl bg-yellow-500" />
      <div className="flex-1 flex flex-col justify-center px-6 py-4">
        {/* Top Row: Heading, Tags, Edit/Delete */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCompletion}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                habit.completed
                  ? "bg-yellow-500 border-yellow-500"
                  : "border-gray-300 hover:border-yellow-500"
              }`}
            >
              {habit.completed && <CheckCircle size={16} className="text-black" />}
            </button>
            <span className="font-bold text-lg text-black whitespace-nowrap">{habit.name}</span>
            {/* Tags beside heading, spaced away */}
            <div className="flex items-center gap-2 ml-4">
              {/* Softer OG color for category */}
              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                {getTagIcon(habit.category)}{habit.category}
              </span>
              {/* Softer OG color for type */}
              <span className="inline-flex items-center bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100">
                {getTypeIcon(habit.type)}{habit.type}
              </span>
              {/* Softer OG color for priority */}
              <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border border-gray-200 ${
                habit.priority === 'high' ? 'bg-red-50 text-red-600' :
                habit.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                'bg-gray-50 text-gray-500'
              }`}>{habit.priority}</span>
            </div>
          </div>
          {/* Edit/Delete buttons top right */}
          <div className="flex items-center gap-2 ml-4">
            {habit.type === "time" && habit.targetTime > 0 && (
              <button
                onClick={() => toggleTimer(habit._id, habit.timeSpent)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isTimerRunning
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
              </button>
            )}
            <button
              className="p-2 hover:bg-gray-200 rounded-lg"
              onClick={() => setEditingHabit(habit)}
            >
              <Pencil size={16} className="text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded-lg"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
        {habit.notes && <p className="text-sm text-gray-500 mb-2 mt-1">{habit.notes}</p>}
        <hr className="my-2 border-t border-gray-100" />
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} className="text-yellow-500" />
            <span className="text-xs font-medium text-gray-700">{habit.streak}</span>
          </div>
          {habit.type === "time" && (
            <div className="flex items-center gap-1">
              <Timer size={16} className="text-gray-400" />
              <span className="text-xs text-gray-700">
                {isTimerRunning
                  ? formatTime(timerSeconds)
                  : formatTime(habit.timeSpent)}
                /{formatTime(habit.targetTime)}
              </span>
            </div>
          )}
          {habit.type === "counter" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCounterChange(false)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <Minus size={12} />
              </button>
              <span className="font-semibold text-sm">{habit.counterValue}</span>
              <span className="text-xs text-gray-700">/ {habit.counterTarget}</span>
              <button
                onClick={() => handleCounterChange(true)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl border-2 p-8 max-w-lg w-full flex flex-col items-center relative">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 mb-4">
              <Trash size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-black mb-2 text-center">Delete Task?</h2>
            <p className="text-gray-700 text-center mb-6">Are you sure you want to delete <span className="font-semibold text-yellow-600">{habit.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-4 w-full justify-center">
              <button
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold border border-gray-300 hover:bg-gray-200 transition"
                onClick={() => setShowDeleteModal(false)}
              >Cancel</button>
              <button
                className="px-6 py-2 rounded-lg bg-yellow-500 text-black font-bold border border-yellow-600 hover:bg-yellow-600 hover:text-white transition"
                onClick={deleteHabit}
              >Delete</button>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 text-xl font-bold"
              onClick={() => setShowDeleteModal(false)}
              aria-label="Close"
            >×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
