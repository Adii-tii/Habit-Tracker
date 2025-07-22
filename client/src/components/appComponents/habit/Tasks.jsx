import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MyHabits from './MyHabits';
import { Search, Plus } from 'lucide-react';
import Reminders from '../ui/Reminder';
import AddTaskModal from '../modals/AddTaskModal';
import AddReminderModal from '../modals/AddReminderModal';

const Tasks = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const [reminders, setReminders] = useState([]);
  const [remindersLoading, setRemindersLoading] = useState(true);

  const [editingHabit, setEditingHabit] = useState(null);

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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!userId) return;
    setRemindersLoading(true);
    fetch(`${API_BASE_URL}/api/reminders/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setReminders(data);
        setRemindersLoading(false);
      })
      .catch(() => setRemindersLoading(false));
  }, [userId]);

  const handleSaveTask = async(newTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/saveHabit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, userId }),
      });
      const result = await response.json();
      if (response.ok) {
        setHabits(prev => [...prev, result.habit]);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error('Error saving task:', err);
    }
    setIsTaskModalOpen(false);
  };

  const handleSaveReminder = async (newReminder) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReminder, userId }),
      });
      if (!response.ok) throw new Error('Failed to save reminder');
      const data = await response.json();
      setReminders(prev => [...prev, data.reminder]);
    } catch (err) {
      alert('Could not save reminder. Try again.');
    }
    setIsReminderModalOpen(false);
  };

  const handleDeleteReminder = async (reminderId) => {
    try {
      await fetch(`${API_BASE_URL}/api/reminders/${reminderId}`, { method: 'DELETE' });
      setReminders(prev => prev.filter(r => r._id !== reminderId));
    } catch (err) {
      alert('Could not delete reminder.');
    }
  };

  const showNoTasks = !habits || habits.length === 0;

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
        <div className="relative w-full md:w-1/2">
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2'>
          {showNoTasks ? (
            <div className="text-center text-gray-400 py-12 text-lg font-semibold">
              🎉 No tasks yet! Add your first habit or task to get started.
            </div>
          ) : (
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
              setEditingHabit={setEditingHabit}
            />
          )}
        </div>
        <div className='col-span-1'>
          <Reminders
            reminders={reminders}
            loading={remindersLoading}
            onDelete={handleDeleteReminder}
          />
        </div>
      </div>
      <AddTaskModal
        isOpen={isTaskModalOpen || !!editingHabit}
        onClose={() => { setIsTaskModalOpen(false); setEditingHabit(null); }}
        onSave={handleSaveTask}
        userId={userId}
        habits={habits}
        setHabits={setHabits}
        editingTask={editingHabit}
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
