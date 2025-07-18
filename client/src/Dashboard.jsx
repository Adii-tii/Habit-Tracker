import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import MotivationalQuote from './components/appComponents/MotivationalQuote';
import QuickTaskBox from './components/appComponents/ui/Goals';
import Reminders from './components/appComponents/ui/Reminder';
import TodaysSummary from './components/appComponents/dashboard/TodaysSummary';
import WeeklyOverview from './components/appComponents/dashboard/WeeklyOverview';
import CalendarCard from './components/appComponents/ui/CalendarCard';
import MyHabits from './components/appComponents/habit/MyHabits';
import UserLevelCard from './components/appComponents/ui/UserLevelCard';
import SearchComp from './components/appComponents/ui/SearchComp';

const TodaysProgress = ({ habits, streakCount = 0, weeklyProgress = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <TodaysSummary habits={habits} streakCount={streakCount} />
    <WeeklyOverview weeklyProgress={weeklyProgress} />
    <QuickTaskBox />
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

  const weeklyProgress = [
    { day: 'Mon', completion: 80 },
    { day: 'Tue', completion: 95 },
    { day: 'Wed', completion: 60 },
    { day: 'Thu', completion: 30 },
    { day: 'Fri', completion: 85 },
    { day: 'Sat', completion: 70 },
    { day: 'Sun', completion: 40 },
  ];

  const reminders = [
    { id: 1, date: '09', title: 'Birthday Party at venue', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 2, date: '12', title: 'Khoya khoya pyaar', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 3, date: '23', title: 'Study fair', time: '11:00 - 13:00', type: "Mother's day" },
    { id: 4, date: '31', title: 'Project Submission', time: '11:00 - 13:00', type: "Cipher school" },
    { id: 5, date: '31', title: 'Project Submission', time: '11:00 - 13:00', type: "Cipher school" },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div>
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
  );
};

export default Dashboard;
