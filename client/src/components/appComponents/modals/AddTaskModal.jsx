import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';


const categoryOptions = [
  { value: 'health', label: 'Health', color: 'bg-green-100 text-green-700' },
  { value: 'learning', label: 'Learning', color: 'bg-purple-100 text-purple-700' },
  { value: 'wellness', label: 'Wellness', color: 'bg-blue-100 text-blue-700' },
];

const priorityOptions = [
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700' },
];

const typeOptions = [
  { value: 'time', label: 'Time-based', description: 'Track time like Pomodoro' },
  { value: 'checklist', label: 'Checklist', description: 'Simple done/undone' },
  { value: 'counter', label: 'Counter', description: 'Incremental actions' },
];

const AddTaskModal = ({ isOpen, onClose, onSave, userId, setHabits, habits, editingTask }) => {
  const [task, setTask] = useState({
    name: '',
    category: 'health',
    priority: 'medium',
    type: 'time',
    notes: '',
    targetTime: 0,
    counterTarget: 0,
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTask({
        name: editingTask.name || '',
        category: editingTask.category || 'health',
        priority: editingTask.priority || 'medium',
        type: editingTask.type || 'time',
        notes: editingTask.notes || '',
        targetTime: editingTask.targetTime ? editingTask.targetTime / 60 : 0, // convert seconds to minutes
        counterTarget: editingTask.counterTarget || 0,
      });
    } else {
      setTask({
        name: '',
        category: 'health',
        priority: 'medium',
        type: 'time',
        notes: '',
        targetTime: 0,
        counterTarget: 0,
      });
    }
  }, [editingTask, isOpen]);

  const handleChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!task.name.trim()) {
      alert('Task name is required');
      return;
    }
    try {
      const payload = {
        ...task,
        userId,
        targetTime: task.type === 'time' ? task.targetTime * 60 : 0,
        counterTarget: task.type === 'counter' ? task.counterTarget : 0,
      };
      let res, data;
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (editingTask && editingTask._id) {
        // Edit mode: PUT request
        res = await fetch(`${API_BASE_URL}/api/habits/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update task');
        data = await res.json();
        // Update the habit in the list
        setHabits((prev) => prev.map(h => h._id === editingTask._id ? { ...h, ...(data.habit || data) } : h));
      } else {
        // Add mode: POST request
        res = await fetch(`${API_BASE_URL}/api/habits/saveHabit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to save task');
        data = await res.json();
        setHabits((prev) => [...prev, data.habit]);
      }
      if (onSave) onSave(data.habit || payload);
      onClose();
    } catch (err) {
      console.error(err);
      alert(`Could not save task. Try again. ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden relative">
        <div className="max-h-[75vh] overflow-y-auto p-8 pb-36">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-8">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

          <div className="space-y-8">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
              <input
                value={task.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                placeholder="e.g. Drink 8 glasses of water"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex gap-2 flex-wrap">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('category', option.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                      task.category === option.value
                        ? `${option.color} border-transparent`
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex gap-2 flex-wrap">
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('priority', option.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                      task.priority === option.value
                        ? `${option.color} border-transparent`
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Type Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg text-left focus:ring-yellow-500 focus:border-yellow-500"
              >
                <span className="text-gray-700 font-medium">
                  {typeOptions.find((option) => option.value === task.type)?.label}
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>

              {showDropdown && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {typeOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        handleChange('type', option.value);
                        setShowDropdown(false);
                      }}
                      className={`px-4 py-3 hover:bg-yellow-50 cursor-pointer transition ${
                        task.type === option.value ? 'bg-yellow-100' : ''
                      }`}
                    >
                      <div className="font-medium text-gray-800">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {task.type === 'time' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Time (in minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={task.targetTime}
                  onChange={(e) => handleChange('targetTime', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  placeholder="e.g. 25"
                />
              </div>
            )}

            {task.type === 'counter' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counter Target</label>
                <input
                  type="number"
                  min="1"
                  value={task.counterTarget}
                  onChange={(e) => handleChange('counterTarget', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  placeholder="e.g. 8"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={task.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                placeholder="Optional notes..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-black text-white border rounded-md hover:bg-white hover:text-black hover:border-black transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            onClick={handleSubmit}
          >
            {editingTask ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
