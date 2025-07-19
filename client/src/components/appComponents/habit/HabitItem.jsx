import React from "react";
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

  const updateHabit = async (updates) => {
    try {
      const res = await fetch(`http://localhost:5000/api/habits/${habit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update habit");
      fetchHabits(); // Refresh habits after update
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const deleteHabit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/habits/${habit._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchHabits();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete habit.");
    }
  };

  const toggleCompletion = () => {
    updateHabit({ completed: !habit.completed });
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

  return (
    <div className="bg-white rounded-xl p-4 hover:bg-gray-100 transition border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        {/* Left Side */}
        <div className="flex items-start space-x-3">
          <button
            onClick={toggleCompletion}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              habit.completed
                ? "bg-yellow-500 border-yellow-500"
                : "border-gray-300 hover:border-yellow-500"
            }`}
          >
            {habit.completed && <CheckCircle size={14} className="text-black" />}
          </button>

          <div>
            <h3 className="font-medium text-gray-900">{habit.name}</h3>
            <div className="mt-1 flex space-x-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  habit.category === "learning"
                    ? "bg-purple-100 text-purple-700"
                    : habit.category === "health"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {habit.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                  habit.priority
                )}`}
              >
                {habit.priority}
              </span>
            </div>
            {habit.notes && <p className="text-sm text-gray-500 mt-1">{habit.notes}</p>}
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-2">
          {habit.type === "time" && habit.targetTime > 0 && (
            <button
              onClick={() => toggleTimer(habit._id)}
              className={`p-2 rounded-lg ${
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
            onClick={deleteHabit}
          >
            <Trash size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${habit.progress}%` }}
              />
            </div>
            <span className="text-xs font-medium">{habit.progress}%</span>
          </div>

          <div className="flex items-center space-x-1">
            <Flame size={14} className="text-yellow-500" />
            <span className="text-xs font-medium">{habit.streak}</span>
          </div>

          {habit.type === "time" && (
            <div className="flex items-center space-x-1">
              <Timer size={14} className="text-gray-400" />
              <span className="text-xs">
                {isTimerRunning
                  ? formatTime(timerSeconds)
                  : formatTime(habit.timeSpent)}
                /{formatTime(habit.targetTime)}
              </span>
            </div>
          )}

          {habit.type === "counter" && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCounterChange(false)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <Minus size={12} />
              </button>
              <span className="font-semibold text-sm">{habit.counterValue}</span>
              <span className="text-xs">/ {habit.counterTarget}</span>
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
    </div>
  );
};

export default HabitItem;
