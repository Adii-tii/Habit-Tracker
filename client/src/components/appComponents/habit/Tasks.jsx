import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MyHabits from './MyHabits';
import { Search, Plus } from 'lucide-react';

const Tasks = () => {
  const {
    habits,
    toggleTimer,
    timerActive,
    timerSeconds,
    toggleCompletion,
    showHistory
  } = useOutletContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full border border-gray-300 rounded-full px-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="health">Health</option>
          <option value="learning">Learning</option>
          <option value="wellness">Wellness</option>
        </select>
      </div>

      <MyHabits
        habits={habits}
        toggleTimer={toggleTimer}
        timerActive={timerActive}
        timerSeconds={timerSeconds}
        toggleCompletion={toggleCompletion}
        showHistory={showHistory}
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default Tasks;
