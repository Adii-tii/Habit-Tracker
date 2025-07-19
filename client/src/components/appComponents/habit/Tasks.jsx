import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MyHabits from './MyHabits';
import { Search, Plus } from 'lucide-react';
import Reminders from '../ui/Reminder';
import AddTaskModal from '../modals/AddTaskModal';
import AddReminderModal from '../modals/AddReminderModal';

const Tasks = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const reminders = [
    { id: 1, date: '09', title: 'Birthday Party at venue', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 2, date: '12', title: 'Khoya khoya pyaar', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 3, date: '23', title: 'Study fair', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 4, date: '31', title: 'Project Submission', time: '11:00 - 13:00', type: "Cipher school" },
    { id: 5, date: '31', title: 'Project Submission', time: '11:00 - 13:00', type: "Cipher school" },
  ];

  const {
    userName,
    userLevel,
    userId,
    habits,  
    toggleTimer,
    timerActive,
    timerSeconds,
    toggleCompletion,
    showHistory,
    setHabits,
    fetchHabits
  } = useOutletContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleSaveTask = async(newTask) => {
    try {
    const response = await fetch('http://localhost:5000/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newTask, userId }), // ✅ attach userId here
    });

    const result = await response.json();

    if (response.ok) {
      setHabits(prev => [...prev, result.habit]); // optimistic update
    } else {
      console.error(result.message);
    }

  } catch (err) {
    console.error('Error saving task:', err);
  }

  setIsTaskModalOpen(false);
  };

  const handleSaveReminder = (newReminder) => {
    console.log('Reminder to save:', newReminder);
    setIsReminderModalOpen(false);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Activities</h1>

        <div className="flex space-x-2">
          <button
            className="bg-yellow-500 text-black  px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center space-x-2"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>

          <button
            className="bg-white border border-yellow-400 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-50 flex items-center space-x-2"
            onClick={() => setIsReminderModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
  {/* Stats Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="bg-yellow-400 rounded-xl px-4 py-3 shadow-sm ">
            <p className="text-sm text-black">Streak</p>
            <p className="text-xl font-semibold text-black">5 days</p>
          </div>
          <div className="bg-black rounded-xl px-4 py-3 shadow-sm border border-yellow-100">
            <p className="text-sm text-gray-100">Time Spent</p>
            <p className="text-xl font-semibold text-yellow-500">120 min</p>
          </div>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-yellow-100">
            <p className="text-sm text-gray-500">Target Time</p>
            <p className="text-xl font-semibold text-yellow-600">150 min</p>
          </div>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-yellow-100">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold text-yellow-600">Yes</p>
          </div>
        </div>

        {/* Optional: Spacer or Filters on the Right */}
        <div className="relative w-full md:w-1/2">
          {/* You can insert filters or date range pickers here */}
        </div>
      </div>


      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2'>
          <MyHabits
            habits={habits}
            toggleTimer={toggleTimer}
            timerActive={timerActive}
            timerSeconds={timerSeconds}
            toggleCompletion={toggleCompletion}
            showHistory={showHistory}
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            fetchHabits={fetchHabits}
          />
        </div>
        <div className='col-span-1'>
          <Reminders reminders={reminders} />
        </div>
      </div>

      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        userId={userId}
        habits={habits}
        setHabits={setHabits}
      />

      <AddReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSave={handleSaveReminder}
      />
    </div>
  );
};

export default Tasks;
