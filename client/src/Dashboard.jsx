import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MotivationalQuote from './components/appComponents/MotivationalQuote';
import QuickTaskBox from './components/appComponents/ui/Goals';
import Reminders from './components/appComponents/ui/Reminder';
import TodaysSummary from './components/appComponents/dashboard/TodaysSummary';
import WeeklyOverview from './components/appComponents/dashboard/WeeklyOverview';
import CalendarCard from './components/appComponents/ui/CalendarCard';
import MyHabits from './components/appComponents/habit/MyHabits';
import UserLevelCard from './components/appComponents/ui/UserLevelCard';
import SearchComp from './components/appComponents/ui/SearchComp';
import { Plus, MessageCircle } from 'lucide-react';

const TodaysProgress = ({ habits, streakCount = 0, weeklyProgress = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
    <div className="h-full flex flex-col"><TodaysSummary habits={habits} streakCount={streakCount} /></div>
    <div className="h-full flex flex-col"><WeeklyOverview weeklyProgress={weeklyProgress} /></div>
    <div className="h-full flex flex-col"><QuickTaskBox /></div>
  </div>
);

const Dashboard = () => {
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
  } = useOutletContext();

  const [currentDate] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  // Add these state and function hooks to Dashboard
  const [editingHabit, setEditingHabit] = useState(null);
  const { fetchHabits } = useOutletContext();
  const [reminders, setReminders] = useState([]);
  const [remindersLoading, setRemindersLoading] = useState(true);
  const navigate = useNavigate();

  // Calculate today's completion rate
  const completedToday = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const todayCompletion = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  // Generate weeklyProgress using today's completion for all days
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyProgress = daysOfWeek.map(day => ({ day, completion: todayCompletion }));

  useEffect(() => {
    if (!userId) return;
    setRemindersLoading(true);
    fetch(`http://localhost:5000/api/reminders/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setReminders(data);
        setRemindersLoading(false);
      })
      .catch(() => setRemindersLoading(false));
  }, [userId]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* AI Assistant Icon with Left Tooltip */}
          <div className="relative group flex items-center">
            <div className="absolute right-full mr-3 flex items-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              <div className="relative">
                <div className="px-3 py-1 bg-white text-black text-xs rounded shadow whitespace-nowrap font-medium">
                  Need ideas? Ask Bo!
                </div>
                {/* Arrow */}
                <div className="absolute top-1/2 right-0 -mr-2 -translate-y-1/2 w-3 h-3">
                  <svg width="12" height="12" viewBox="0 0 12 12" className="block">
                    <polygon points="0,6 12,0 12,12" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/ai-suggestions')}
              className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black transition-all focus:outline-none"
              aria-label="Talk to Bo"
            >
              <MessageCircle size={28} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="pb-0">
            <TodaysProgress habits={habits} weeklyProgress={weeklyProgress} streakCount={5} />
          </div>
          <div>
            <MyHabits
              habits={habits}
              toggleTimer={toggleTimer}
              timerActive={timerActive}
              timerSeconds={timerSeconds}
              toggleCompletion={toggleCompletion}
              showHistory={showHistory}
              fetchHabits={fetchHabits}
              setEditingHabit={setEditingHabit}
            />
          </div>
        </div>
        <div className="space-y-6">
          <UserLevelCard userName={userName} userId={userId} userLevel={userLevel} />
          <MotivationalQuote />
          <CalendarCard currentDate={currentDate} />
          <Reminders reminders={reminders} loading={remindersLoading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
