import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Target,
  Clock,
  Award,
  Activity,
  CheckCircle,
  XCircle,
  Flame
} from 'lucide-react';

const Analytics = () => {
  const { userName, userLevel, habits, userId } = useOutletContext();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analytics, setAnalytics] = useState({
    totalHabits: 0,
    completedToday: 0,
    completionRate: 0,
    streak: 0,
    weeklyProgress: [],
    topHabits: [],
    timeSpent: 0
  });

  // Calculate analytics from habits data
  useEffect(() => {
    if (!habits || habits.length === 0) return;

    const today = new Date();
    const completedToday = habits.filter(habit => habit.completed).length;
    const completionRate = Math.round((completedToday / habits.length) * 100);

    // Mock weekly progress (you'd calculate this from actual completion data)
    const weeklyProgress = [
      { day: 'Mon', completed: 3, total: 5 },
      { day: 'Tue', completed: 4, total: 5 },
      { day: 'Wed', completed: 2, total: 5 },
      { day: 'Thu', completed: 5, total: 5 },
      { day: 'Fri', completed: 3, total: 5 },
      { day: 'Sat', completed: 4, total: 5 },
      { day: 'Sun', completed: 1, total: 5 }
    ];

    // Top performing habits
    const topHabits = habits
      .map(habit => ({
        ...habit,
        completionRate: Math.floor(Math.random() * 100) // Mock data
      }))
      .sort((a, b) => b.completionRate - a.completionRate)
      .slice(0, 3);

    setAnalytics({
      totalHabits: habits.length,
      completedToday,
      completionRate,
      streak: 7, // Mock streak
      weeklyProgress,
      topHabits,
      timeSpent: 45 // Mock time in minutes
    });
  }, [habits]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "yellow" }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ day, completed, total }) => {
    const percentage = (completed / total) * 100;
    return (
      <div className="text-center">
        <div className="w-8 h-24 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="bg-yellow-500 rounded-full transition-all duration-300"
            style={{ height: `${percentage}%`, marginTop: `${100 - percentage}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{day}</span>
        <div className="text-xs text-gray-500 mt-1">{completed}/{total}</div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="text-yellow-600" />
            Analytics
          </h1>
          <p className="text-gray-600 mt-2">Track your habit progress and insights</p>
        </div>
        
        <div className="flex items-center gap-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Target}
          title="Total Habits"
          value={analytics.totalHabits}
          subtitle="Active habits"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed Today"
          value={analytics.completedToday}
          subtitle={`${analytics.completionRate}% completion rate`}
          color="green"
        />
        <StatCard
          icon={Flame}
          title="Current Streak"
          value={`${analytics.streak} days`}
          subtitle="Keep it up!"
          color="orange"
        />
        <StatCard
          icon={Clock}
          title="Time Spent"
          value={`${analytics.timeSpent}m`}
          subtitle="This week"
          color="blue"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="text-yellow-600" />
            Weekly Progress
          </h3>
          <div className="flex items-end justify-between gap-4">
            {analytics.weeklyProgress.map((day, index) => (
              <ProgressBar
                key={index}
                day={day.day}
                completed={day.completed}
                total={day.total}
              />
            ))}
          </div>
        </div>

        {/* Top Habits */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-yellow-600" />
            Top Performing Habits
          </h3>
          <div className="space-y-4">
            {analytics.topHabits.map((habit, index) => (
              <div key={habit._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{habit.name}</p>
                    <p className="text-sm text-gray-500">{habit.completionRate}% completion</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${habit.completionRate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{habit.completionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-yellow-600" />
          Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span className="font-medium text-green-800">Great Progress!</span>
            </div>
            <p className="text-sm text-green-700">
              You've maintained a {analytics.streak}-day streak. Keep up the excellent work!
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-blue-600 w-5 h-5" />
              <span className="font-medium text-blue-800">Consistency Tip</span>
            </div>
            <p className="text-sm text-blue-700">
              Try to complete habits in the morning for better consistency rates.
            </p>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="text-yellow-600" />
          Level Progress
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Current Level</p>
            <p className="text-2xl font-bold text-gray-900">Level {userLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Next Level</p>
            <p className="text-2xl font-bold text-yellow-600">Level {userLevel + 1}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-yellow-500 h-4 rounded-full transition-all duration-300"
            style={{ width: '75%' }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">750/1000 XP to next level</p>
      </div>
    </div>
  );
};

export default Analytics;
