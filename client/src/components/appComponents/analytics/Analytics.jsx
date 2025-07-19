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
  Flame
} from 'lucide-react';

const getCompletionData = (habits) => {
  const today = new Date();
  const NUM_DAYS = 365;
  const data = {};
  for (let i = 0; i < NUM_DAYS; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    let count = 0;
    habits.forEach(habit => {
      if (habit.completedDates && habit.completedDates.includes(dateStr)) count++;
    });
    data[dateStr] = count;
  }
  return data;
};

const getGitHubHeatmapData = (habits) => {
  const today = new Date();
  const NUM_DAYS = 365;
  const data = {};
  for (let i = 0; i < NUM_DAYS; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    let count = 0;
    habits.forEach(habit => {
      if (habit.completedDates && habit.completedDates.includes(dateStr)) count++;
    });
    data[dateStr] = count;
  }
  const weeks = [];
  let currentWeek = [];
  let firstDate = new Date(today);
  firstDate.setDate(today.getDate() - NUM_DAYS + 1);
  let dayOfWeek = firstDate.getDay();
  for (let i = 0; i < dayOfWeek; i++) currentWeek.push(null);
  for (let i = NUM_DAYS - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    currentWeek.push({ date: dateStr, count: data[dateStr] });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
};

const CompletionCalendar = ({ habits }) => {
  const weeks = getGitHubHeatmapData(habits);
  const monthLabels = [];
  let lastMonth = null;
  weeks.forEach((week, i) => {
    const firstDay = week.find(day => day !== null);
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ index: i, label: new Date(firstDay.date).toLocaleString('default', { month: 'short' }) });
        lastMonth = month;
      }
    }
  });
  // Color scale
  const getColor = (count) => {
    if (count === 0) return 'bg-gray-200';
    if (count === 1) return 'bg-yellow-100';
    if (count === 2) return 'bg-yellow-300';
    if (count === 3) return 'bg-yellow-400';
    if (count >= 4) return 'bg-yellow-500';
    return 'bg-gray-200';
  };
  // Tooltip
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const handleMouseEnter = (date, count, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip({
      show: true,
      content: `${count} completions on ${new Date(date).toLocaleDateString()}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };
  const handleMouseLeave = () => setTooltip({ show: false, content: '', x: 0, y: 0 });
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const totalCompletions = weeks.flat().reduce((sum, d) => sum + (d && d.count ? d.count : 0), 0);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 h-full flex flex-col justify-between">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Completion Calendar</h3>
      <div className="flex flex-col items-center">
        <div className="flex mb-2 ml-8">
          <div className="w-6" />
          {weeks.map((_, i) => {
            const label = monthLabels.find(m => m.index === i);
            return (
              <div key={i} className="w-4 text-xs text-gray-500 text-center">
                {label ? label.label : ''}
              </div>
            );
          })}
        </div>
        <div className="flex">
          <div className="flex flex-col mr-2 justify-between h-[112px]">
            {dayLabels.map((day, idx) => (
              <div key={day} className="text-xs text-gray-500 h-4 flex items-center justify-end w-6">{day}</div>
            ))}
          </div>
          {/* Heatmap Grid */}
          <div className="flex">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col">
                {week.map((day, dayIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`w-4 h-4 mb-1 rounded-sm cursor-pointer border border-gray-300 ${day ? getColor(day.count) : 'bg-transparent border-transparent'}`}
                    onMouseEnter={day ? (e) => handleMouseEnter(day.date, day.count, e) : undefined}
                    onMouseLeave={handleMouseLeave}
                    title={day ? `${day.count} completions on ${day.date}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-4">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-4 h-4 rounded-sm border border-gray-300 ${getColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
        {/* Tooltip */}
        {tooltip.show && (
          <div
            className="fixed z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y, transform: 'translateX(-50%) translateY(-100%)' }}
          >
            {tooltip.content}
          </div>
        )}
        <div className="mt-4 text-sm text-gray-500">{totalCompletions} completions in the last year</div>
      </div>
    </div>
  );
};

const Analytics = () => {
  const { userName, userLevel, habits, userId } = useOutletContext();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalHabits: 0,
    completedToday: 0,
    completionRate: 0,
    streak: 0,
    weeklyProgress: [],
    topHabits: [],
    timeSpent: 0
  });

  useEffect(() => {
    if (!habits) return;
    setLoading(true);
    const today = new Date();
    const completedToday = habits.filter(habit => habit.completed).length;
    const completionRate = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyProgress = daysOfWeek.map(day => ({ day, completed: completedToday, total: habits.length }));
    const topHabits = [...habits]
      .sort((a, b) => (b.completed ? 1 : 0) - (a.completed ? 1 : 0))
      .slice(0, 3)
      .map(habit => ({ ...habit, completionRate: habit.completed ? 100 : 0 }));
    setAnalytics({
      totalHabits: habits.length,
      completedToday,
      completionRate,
      streak: completedToday > 0 ? 1 : 0, 
      weeklyProgress,
      topHabits,
      timeSpent: 0 
    });
    setLoading(false);
  }, [habits]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "yellow" }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full bg-yellow-100">
          <Icon className="w-6 h-6 text-yellow-500" />
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ day, completed, total }) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return (
      <div className="text-center">
        <div className="w-8 h-24 bg-gray-200 rounded-full overflow-hidden mb-2 border border-yellow-100 flex flex-col-reverse">
          <div 
            className="bg-yellow-400 rounded-full transition-all duration-500"
            style={{ height: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{day}</span>
        <div className="text-xs text-gray-400 mt-1">{completed}/{total}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-2xl">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded-2xl border border-yellow-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center gap-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors border border-yellow-200 text-gray-900 ${
                selectedPeriod === period
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white hover:bg-yellow-50'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
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
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            Top Performing Habits
          </h3>
          <div className="space-y-4">
            {analytics.topHabits.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No habits to show yet.</div>
            ) : (
              analytics.topHabits.map((habit, index) => (
                <div key={habit._id || habit.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-400 text-gray-900' :
                      index === 1 ? 'bg-gray-300 text-gray-900' :
                      'bg-yellow-100 text-yellow-800'
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
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${habit.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500">{habit.completionRate}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <CompletionCalendar habits={habits} />
    </div>
  );
};

export default Analytics;
