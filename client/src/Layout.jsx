import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Outlet, Navigate } from 'react-router-dom'; // 🛠️ Added Navigate
import Sidebar from './components/appComponents/layout/Sidebar';
import BetaNoticeModal from './components/appComponents/ui/BetaNoticeModal';
import { useUser } from './components/UserContext.jsx';

const AppLayout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarCollapsed');
      return stored === null ? true : stored === 'true';
    }
    return true;
  });
  const [userLevel, setUserLevel] = useState(12);
  const { user } = useUser();
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [lastUserId, setLastUserId] = useState(null);

  const [habits, setHabits] = useState([]);
  const [timerActive, setTimerActive] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerStartValue, setTimerStartValue] = useState(0); // stores the habit's last saved timeSpent
  const timerIntervalRef = useRef(null); // <-- Fix ReferenceError for timerIntervalRef

  // Dark mode state and logic
  const getInitialDarkMode = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) return stored === 'true';
      // Fallback to system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };
  const [darkMode, setDarkMode] = useState(getInitialDarkMode());

  useEffect(() => {
    const handler = () => {
      setDarkMode(getInitialDarkMode());
    };
    window.addEventListener('darkmode-toggle', handler);
    return () => window.removeEventListener('darkmode-toggle', handler);
  }, []);

  useEffect(() => {
    // Keep localStorage in sync if changed from other sources
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isNavCollapsed);
  }, [isNavCollapsed]);

  useEffect(() => {
    if (user && user.id !== lastUserId && user.id !== lastUserId) {
      setShowBetaModal(true);
      setLastUserId(user.id);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleCloseBetaModal = () => setShowBetaModal(false);

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

  // Save timeSpent to backend
  const saveTimeSpent = async (habitId, newTimeSpent) => {
    try {
      await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeSpent: newTimeSpent }),
      });
      fetchHabits();
    } catch (err) {
      console.error('Failed to save timeSpent:', err);
    }
  };

  // Pause/resume logic
  const toggleTimer = (habitId, habitTimeSpent = 0) => {
    if (timerActive === habitId) {
      // Pause: Save timeSpent to backend
      const newTimeSpent = timerSeconds;
      saveTimeSpent(habitId, newTimeSpent);
      setTimerActive(null);
      setTimerStartValue(0);
      setTimerSeconds(0);
    } else {
      // Start: Resume from last saved value
      setTimerActive(habitId);
      setTimerStartValue(habitTimeSpent);
      setTimerSeconds(habitTimeSpent);
    }
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

  // Timer interval logic
  useEffect(() => {
    if (timerActive) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timerActive]);

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
            timerStartValue,
            saveTimeSpent,
            toggleCompletion,
            showHistory,
            setHabits,
            setUserLevel,
            fetchHabits,
          }}
        />
      </div>
      <BetaNoticeModal open={showBetaModal} onClose={handleCloseBetaModal} />
    </div>
  );
};

export default AppLayout;
