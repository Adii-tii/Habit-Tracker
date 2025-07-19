import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, Navigate } from 'react-router-dom'; // 🛠️ Added Navigate
import Sidebar from './components/appComponents/layout/Sidebar';
import { useUser } from './components/UserContext.jsx';

const AppLayout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [userLevel, setUserLevel] = useState(12);
  const { user } = useUser();

  const [habits, setHabits] = useState([]);
  const [timerActive, setTimerActive] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // ✅ useCallback to avoid unnecessary re-renders
  const fetchHabits = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/habits/user/${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch habits');
      }

      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error.message);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const toggleTimer = (habitId) => {
    setTimerActive((prev) => (prev === habitId ? null : habitId));
    setTimerSeconds(0);
  };

  const toggleCompletion = (habitId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit._id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const showHistory = (habitId) => {
    // Placeholder for future implementation
    console.log(`Show history for habit: ${habitId}`);
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
        userName={user.name}
        userLevel={userLevel}
      />
      <div className="flex-1 p-8">
        <Outlet
          context={{
            userName: user.name,
            userLevel,
            userId: user.id,
            habits,
            toggleTimer,
            timerActive,
            timerSeconds,
            toggleCompletion,
            showHistory,
            setHabits,
            setUserLevel,
            fetchHabits,
          }}
        />
      </div>
    </div>
  );
};

export default AppLayout;
