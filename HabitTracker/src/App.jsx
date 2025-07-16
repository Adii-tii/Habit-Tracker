import React, { useState, useEffect } from 'react';
import logo from "./assets/logo.png";
import { Calendar, Clock, Plus, MoreVertical, Play, Check, Search, Settings, BarChart3, Target, Trophy, Grid3x3, X, Edit2, Trash2 } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', icon: Grid3x3, label: 'Dashboard' },
    { id: 'habits', icon: Target, label: 'My Habits' },
    { id: 'streaks', icon: Trophy, label: 'Streaks' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black text-white z-10">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
            <img className="text-xl font-bold w-20 h-auto"
            src= {logo}>
            </img>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                activeSection === item.id ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ totalHabits, userName = "Aditi" }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello, <span>{userName}</span>!
        </h1>
        <p className="text-gray-600">
          You've got <span className="font-semibold text-gray-900">{totalHabits} habits today!</span> 
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-semibold text-gray-900">{userName} Smith</p>
            <p className="text-sm text-gray-500">Habit Tracker</p>
          </div>
        </div>
        <button className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🔔</span>
        </button>
      </div>
    </div>
  );
};

// Add Habit Modal Component
const AddHabitModal = ({ isOpen, onClose, onAddHabit }) => {
  const [habitData, setHabitData] = useState({
    title: '',
    description: '',
    time: '',
    category: 'health'
  });

  const categories = ['health', 'productivity', 'learning', 'fitness', 'mindfulness'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitData.title.trim()) {
      onAddHabit({
        ...habitData,
        id: Date.now(),
        completed: false,
        progress: 0,
        streak: 0,
        completedDates: []
      });
      setHabitData({ title: '', description: '', time: '', category: 'health' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Habit</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Habit Title</label>
            <input
              type="text"
              value={habitData.title}
              onChange={(e) => setHabitData({...habitData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., Morning Exercise"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={habitData.description}
              onChange={(e) => setHabitData({...habitData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 h-20 resize-none"
              placeholder="Brief description of your habit"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={habitData.time}
              onChange={(e) => setHabitData({...habitData, time: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={habitData.category}
              onChange={(e) => setHabitData({...habitData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 font-medium"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Habit Card Component
const HabitCard = ({ habit, onToggleComplete, onDeleteHabit }) => {
  const getCategoryColor = (category) => {
    const colors = {
      health: 'bg-green-100 text-green-800',
      productivity: 'bg-blue-100 text-blue-800',
      learning: 'bg-purple-100 text-purple-800',
      fitness: 'bg-red-100 text-red-800',
      mindfulness: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
          <div>
            <h3 className="font-semibold text-gray-900">{habit.title}</h3>
            <p className="text-sm text-gray-500">{habit.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(habit.category)}`}>
            {habit.category}
          </span>
          <button
            onClick={() => onDeleteHabit(habit.id)}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${habit.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">{habit.progress}%</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">{habit.streak} days</span>
          </div>
          
          {habit.time && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{habit.time}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => onToggleComplete(habit.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            habit.completed 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {habit.completed ? <Check className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

// Habits List Component
const HabitsList = ({ habits, onToggleComplete, onDeleteHabit, searchTerm, activeTab }) => {
  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'Today':
        return matchesSearch;
      case 'Completed':
        return matchesSearch && habit.completed;
      case 'Pending':
        return matchesSearch && !habit.completed;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-4">
      {filteredHabits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No habits found. Add your first habit to get started!</p>
        </div>
      ) : (
        filteredHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleComplete={onToggleComplete}
            onDeleteHabit={onDeleteHabit}
          />
        ))
      )}
    </div>
  );
};

// Dynamic Calendar Component
const DynamicCalendar = ({ habits, streakDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isStreakDate = (day) => {
    if (!day) return false;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return streakDates.includes(dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-black py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {getCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`h-8 flex items-center justify-center text-sm cursor-pointer rounded transition-colors ${
              day === null 
                ? '' 
                : isStreakDate(day)
                ? 'bg-yellow-400 text-gray-900 font-semibold ring-2 ring-yellow-300'
                : isToday(day)
                ? 'bg-blue-500 text-black font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span>Streak day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

// Time Tracker Component
const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Focus Timer</h3>
        <button 
          onClick={() => setIsTracking(!isTracking)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isTracking ? 'bg-red-500 text-white' : 'bg-yellow-400 text-gray-900'
          }`}
        >
          {isTracking ? '⏸' : <Play className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        {isTracking ? 'Tracking your focus time' : 'Start your focus session'}
      </p>
      <div className="text-2xl font-bold text-gray-900">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

// Today's Summary Component
const TodaysSummary = ({ habits, streakCount }) => {
  const today = new Date();
  const completedToday = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="bg-yellow-400 rounded-xl p-6 text-gray-900">
      <h3 className="font-semibold mb-2">Today's Progress</h3>
      <div className="text-2xl font-bold mb-4">
        {today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
      </div>
      
      <div className="space-y-3">
        <div className="bg-yellow-500 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Habits Completed</p>
              <p className="text-sm opacity-90">{completedToday} of {totalHabits} habits</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{completionRate}%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Current Streak</p>
              <p className="text-sm opacity-90">Keep it up!</p>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span className="text-xl font-bold">{streakCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: 'Morning Workout',
      description: 'Daily exercise routine',
      progress: 75,
      time: '07:00',
      completed: false,
      category: 'fitness',
      streak: 5,
      completedDates: ['2024-01-10', '2024-01-11', '2024-01-12']
    },
    {
      id: 2,
      title: 'Read for 30 minutes',
      description: 'Reading and learning new things',
      progress: 60,
      time: '08:30',
      completed: true,
      category: 'learning',
      streak: 3,
      completedDates: ['2024-01-10', '2024-01-11', '2024-01-12']
    },
    {
      id: 3,
      title: 'Meditation',
      description: 'Daily mindfulness practice',
      progress: 90,
      time: '09:00',
      completed: false,
      category: 'mindfulness',
      streak: 7,
      completedDates: ['2024-01-10', '2024-01-11', '2024-01-12']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Today');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [streakDates, setStreakDates] = useState(['2024-01-10', '2024-01-11', '2024-01-12']);

  const calculateStreak = (completedDates) => {
    if (completedDates.length === 0) return 0;
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const sortedDates = completedDates.sort((a, b) => new Date(b) - new Date(a));
    
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
      return 0;
    }
    
    let streak = 0;
    let currentDate = new Date(sortedDates[0]);
    
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      if (date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const toggleHabitCompletion = (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        let newCompletedDates = [...habit.completedDates];
        
        if (newCompleted) {
          if (!newCompletedDates.includes(today)) {
            newCompletedDates.push(today);
          }
        } else {
          newCompletedDates = newCompletedDates.filter(date => date !== today);
        }
        
        const newStreak = calculateStreak(newCompletedDates);
        
        return {
          ...habit,
          completed: newCompleted,
          completedDates: newCompletedDates,
          streak: newStreak,
          progress: newCompleted ? Math.min(100, habit.progress + 10) : Math.max(0, habit.progress - 10)
        };
      }
      return habit;
    }));

    // Update streak dates for calendar
    const allStreakDates = habits.reduce((acc, habit) => {
      return [...acc, ...habit.completedDates];
    }, []);
    setStreakDates([...new Set(allStreakDates)]);
  };

  const addHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const getCurrentStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const completedToday = habits.filter(habit => habit.completed).length;
    const totalHabits = habits.length;
    
    if (totalHabits === 0) return 0;
    if (completedToday === totalHabits) {
      return Math.min(...habits.map(habit => habit.streak));
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="ml-64 p-8">
        <Header totalHabits={habits.length} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Habits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Habits</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search habits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Habit</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-8 mb-6">
                {['Today', 'Completed', 'Pending', 'All'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 border-b-2 font-medium ${
                      activeTab === tab 
                        ? 'border-yellow-400 text-yellow-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <HabitsList
                habits={habits}
                onToggleComplete={toggleHabitCompletion}
                onDeleteHabit={deleteHabit}
                searchTerm={searchTerm}
                activeTab={activeTab}
              />
            </div>
          </div>

          {/* Right Column - Calendar & Stats */}
          <div className="space-y-6">
            <TimeTracker />
            <DynamicCalendar habits={habits} streakDates={streakDates} />
            <TodaysSummary habits={habits} streakCount={getCurrentStreak()} />
          </div>
        </div>
      </div>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddHabit={addHabit}
      />
    </div>
  );
};

export default App;