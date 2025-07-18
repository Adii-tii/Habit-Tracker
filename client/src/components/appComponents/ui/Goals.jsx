import React, { useState } from "react";
import { Plus, CheckCircle, Trash2 } from "lucide-react";

const QuickTaskBox = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }]);
      setInputValue("");
    }
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="bg-black text-white rounded-xl p-5 shadow-md space-y-4 w-full">
      <h3 className="text-lg font-semibold">Quick Tasks</h3>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add a task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-400 transition"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks added yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-gray-800 rounded-md px-3 py-2"
            >
              <div
                onClick={() => toggleDone(task.id)}
                className={`flex items-center cursor-pointer space-x-2 ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
              >
                <CheckCircle
                  size={18}
                  className={`${task.done ? "text-yellow-500" : "text-gray-500"}`}
                />
                <span className="text-sm">{task.text}</span>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuickTaskBox;
