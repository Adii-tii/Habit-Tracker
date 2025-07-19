import React from "react";
import { useState } from "react";
import {Search} from "lucide-react"; 
import HabitItem from "./HabitItem";

const MyHabits = ({ habits, toggleTimer, timerActive, timerSeconds, toggleCompletion, fetchHabits, showHistory, taskType, setEditingHabit }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredHabits = habits
    .filter(habit => {
      const matchesFilter = activeFilter === 'all' || habit.category === activeFilter;
      const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className=" rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">My Habits</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <select 
            value={activeFilter} 
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="health">Health</option>
            <option value="learning">Learning</option>
            <option value="wellness">Wellness</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="default">Sort: Default</option>
            <option value="priority">Sort: Priority</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredHabits.map(habit => (
          <HabitItem 
            key={habit.id || habit._id} 
            habit={habit} 
            toggleTimer={toggleTimer} 
            timerActive={timerActive} 
            timerSeconds={timerSeconds} 
            toggleCompletion={toggleCompletion}
            showHistory={showHistory}
            fetchHabits={fetchHabits}
            setEditingHabit={setEditingHabit}
          />
        ))}
      </div>
      
      
    </div>
  );
};


export default MyHabits;
