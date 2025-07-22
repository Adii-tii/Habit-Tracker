import React, { useState, useEffect } from "react";
import { Plus, CheckCircle, Trash2, X } from "lucide-react";
import { useUser } from "../../UserContext";

const QuickTaskBox = () => {
  const { user } = useUser();
  const userId = user?._id || user?.id;
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch tasks from backend
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/api/quicktasks/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const addTask = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || !userId) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/quicktasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, userId }),
      });
      const data = await res.json();
      setTasks(prev => [...prev, data.quickTask]);
      setInputValue("");
    } catch (err) {
      alert("Could not add task. Try again.");
    }
  };

  const toggleDone = async (id, done) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/quicktasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !done }),
      });
      const data = await res.json();
      setTasks(prev => prev.map(t => t._id === id ? { ...t, ...data.quickTask } : t));
    } catch (err) {
      alert("Could not update task.");
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/quicktasks/${id}`, { method: "DELETE" });
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      alert("Could not delete task.");
    }
  };

  // Only show first 5 tasks in the box
  const previewTasks = tasks.slice(0, 2);

  return (
    <>
      <div className="bg-black text-white rounded-2xl p-6 shadow-lg w-full space-y-5 border border-gray-900 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
            Quick Tasks
          </h3>
          {tasks.length > 2 && (
            <button
              className="text-yellow-400 text-xs font-semibold hover:underline focus:outline-none"
              onClick={() => setShowAll(true)}
            >
              See All
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm"
          />
          <button
            onClick={addTask}
            className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-400 transition shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Add task"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto flex-1">
          {loading ? (
            <div className="space-y-2">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse flex justify-between items-center px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
                  <div className="flex items-center gap-2 w-3/4">
                    <div className="w-5 h-5 bg-gray-700 rounded-full" />
                    <div className="h-4 bg-gray-700 rounded w-2/3" />
                  </div>
                  <div className="w-6 h-6 bg-gray-700 rounded-full" />
                </div>
              ))}
            </div>
          ) : previewTasks.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No tasks added yet.</p>
          ) : (
            previewTasks.map((task) => (
              <div
                key={task._id}
                className={`flex justify-between items-center px-4 py-2 rounded-lg transition bg-gray-900 border border-gray-800 shadow-sm group ${task.done ? "opacity-60" : ""}`}
              >
                <div
                  onClick={() => toggleDone(task._id, task.done)}
                  className={`flex items-center gap-2 cursor-pointer select-none ${task.done ? "line-through text-gray-400" : "text-white"}`}
                >
                  <CheckCircle
                    size={20}
                    className={`transition ${task.done ? "text-yellow-500" : "text-gray-500 group-hover:text-yellow-400"}`}
                  />
                  <span className="text-base font-medium">{task.text}</span>
                </div>
                <button
                  onClick={() => removeTask(task._id)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-full transition"
                  aria-label="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Modal for See All */}
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-all">
          <div className="bg-black text-white rounded-2xl p-8 shadow-2xl w-full max-w-lg mx-auto border-2 border-yellow-400 relative flex flex-col" style={{ minHeight: 400, maxHeight: '80vh' }}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-xl font-bold"
              onClick={() => setShowAll(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
              All Quick Tasks
            </h3>
            <div className="space-y-2 overflow-y-auto flex-1 pr-2" style={{ maxHeight: 320 }}>
              {tasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No tasks added yet.</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`flex justify-between items-center px-4 py-2 rounded-lg transition bg-gray-900 border border-gray-800 shadow-sm group ${task.done ? "opacity-60" : ""}`}
                  >
                    <div
                      onClick={() => toggleDone(task._id, task.done)}
                      className={`flex items-center gap-2 cursor-pointer select-none ${task.done ? "line-through text-gray-400" : "text-white"}`}
                    >
                      <CheckCircle
                        size={20}
                        className={`transition ${task.done ? "text-yellow-500" : "text-gray-500 group-hover:text-yellow-400"}`}
                      />
                      <span className="text-base font-medium">{task.text}</span>
                    </div>
                    <button
                      onClick={() => removeTask(task._id)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full transition"
                      aria-label="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickTaskBox;
