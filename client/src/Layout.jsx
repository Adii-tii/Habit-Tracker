import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/appComponents/layout/Sidebar';

const AppLayout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [userName] = useState('Aditi Avinash');
  const [userLevel] = useState(17);
  const [userId] = useState('aditi-5436');

  // Shared logic
  const [habits, setHabits] = useState([]);
  const [timerActive, setTimerActive] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    // Fetch habits here or load mock data
    setHabits([
      {
        id: 1,
        name: 'Read for 30 minutes',
        category: 'learning',
        progress: 60,
        streak: 3,
        time: '08:30',
        completed: true,
        difficulty: 'easy',
        priority: 'high',
        notes: 'Currently reading "Atomic Habits"',
        timeSpent: 1800,
        targetTime: 1800,
        type: 'time-bound'
      },
      {
        id: 2,
        name: 'Drink water',
        category: 'health',
        progress: 25,
        streak: 2,
        time: 'All day',
        completed: false,
        difficulty: 'easy',
        priority: 'medium',
        notes: 'Track with app',
        timeSpent: 0,
        targetTime: 0,
        type: 'counter'
      },
    ]);
  }, []);

  const toggleTimer = (habitId) => {
    if (timerActive === habitId) {
      setTimerActive(null);
    } else {
      setTimerActive(habitId);
      setTimerSeconds(0);
    }
  };

  const toggleCompletion = (habitId) => {
    setHabits(prev =>
      prev.map(h => (h.id === habitId ? { ...h, completed: !h.completed } : h))
    );
  };

  const showHistory = (habitId) => {
    // Implement if needed
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
        userName={userName}
        userLevel={userLevel}
      />
      <div className="flex-1 p-8">
        <Outlet context={{
          userName,
          userLevel,
          userId,
          habits,
          toggleTimer,
          timerActive,
          timerSeconds,
          toggleCompletion,
          showHistory
        }} />
      </div>
    </div>
  );
};

export default AppLayout;
