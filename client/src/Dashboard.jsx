import React, { useState, useEffect } from 'react';
import MotivationalQuote from './components/appComponents/MotivationalQuote';
import PomodoroTimer from './components/appComponents/PomodoroTimer';
import Sidebar from './components/appComponents/layout/Sidebar';
import Reminders from './components/appComponents/ui/Reminder';
import TodaysSummary from './components/appComponents/dashboard/TodaysSummary';
import WeeklyOverview from './components/appComponents/dashboard/WeeklyOverview';
import CalendarCard from './components/appComponents/ui/CalendarCard';
import MyHabits from './components/appComponents/habit/MyHabits';
import UserLevelCard from './components/appComponents/ui/UserLevelCard';
import SearchComp from './components/appComponents/ui/SearchComp';



const TodaysProgress = ({ habits = [], streakCount = 0, weeklyProgress = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TodaysSummary habits={habits} streakCount={streakCount} />
      <WeeklyOverview weeklyProgress={weeklyProgress} />
      <PomodoroTimer />
    </div>
  );
};

// Main Dashboard Component
const HabitTrackerDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [userName] = useState('Aditi Avinash');
  const [userLevel] = useState(17);
  const [userId] = useState('aditi-5436');
  const [timerActive, setTimerActive] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [habits, setHabits] = useState([
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
      targetTime: 1800
    },
    { 
      id: 2, 
      name: 'Morning workout', 
      category: 'health', 
      progress: 45, 
      streak: 5, 
      time: '06:00', 
      completed: false,
      difficulty: 'medium',
      priority: 'high',
      notes: 'Focus on cardio today',
      timeSpent: 0,
      targetTime: 2700
    },
    { 
      id: 3, 
      name: 'Meditation', 
      category: 'wellness', 
      progress: 80, 
      streak: 7, 
      time: '07:00', 
      completed: true,
      difficulty: 'easy',
      priority: 'medium',
      notes: 'Using Headspace app',
      timeSpent: 600,
      targetTime: 600
    },
    { 
      id: 4, 
      name: 'Drink 8 glasses of water', 
      category: 'health', 
      progress: 25, 
      streak: 2, 
      time: 'All day', 
      completed: false,
      difficulty: 'easy',
      priority: 'medium',
      notes: 'Track with water app',
      timeSpent: 0,
      targetTime: 0
    },
    { 
      id: 5, 
      name: 'Code practice', 
      category: 'learning', 
      progress: 90, 
      streak: 12, 
      time: '20:00', 
      completed: true,
      difficulty: 'hard',
      priority: 'high',
      notes: 'Working on React project',
      timeSpent: 3600,
      targetTime: 3600
    },
  ]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const weeklyProgress = [
    { day: 'Mon', completion: 80 },
    { day: 'Tue', completion: 95 },
    { day: 'Wed', completion: 60 },
    { day: 'Thu', completion: 30 },
    { day: 'Fri', completion: 85 },
    { day: 'Sat', completion: 70 },
    { day: 'Sun', completion: 40 }
  ];

  const reminders = [
    { id: 1, date: '09', title: 'Birthday Party at venue', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 2, date: '12', title: 'Khoya khoya pyaar', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 3, date: '23', title: 'Study fair', time: '11:00 - 13:00', type: "Mother's day" },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const toggleTimer = (habitId) => {
    if (timerActive === habitId) {
      setTimerActive(null);
    } else {
      setTimerActive(habitId);
      setTimerSeconds(0);
    }
  };

  const toggleCompletion = (habitId) => {
    setHabits(habits.map(habit => 
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const showHistory = (habitId) => {
    setSelectedHabit(habits.find(habit => habit.id === habitId));
  };

  const closeModal = () => {
    setSelectedHabit(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{greeting}, {userName}</h1>
            <p className="text-gray-600 mt-1">Ready to crush your goals today?</p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchComp />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="pb-8">
              <TodaysProgress currentDate={currentDate} weeklyProgress={weeklyProgress} />
            </div>
            <div>
              <MyHabits 
                habits={habits} 
                toggleTimer={toggleTimer} 
                timerActive={timerActive} 
                timerSeconds={timerSeconds} 
                toggleCompletion={toggleCompletion}
                showHistory={showHistory}
              />
            </div>
            
          </div>

          <div className="space-y-6">
            <UserLevelCard userName={userName} userId={userId} userLevel={userLevel} />
            <MotivationalQuote />
            <CalendarCard currentDate={currentDate} />
            <Reminders reminders={reminders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrackerDashboard;