import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Bell,
  BellOff,
  LogOut,
  Trash2,
  Lock,
  Palette,
  User
} from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check saved preference
    return localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="p-8 w-full min-h-screen bg-gray-50 text-gray-800 dark:bg-slate-900 dark:text-gray-100 space-y-10">
      <h1 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
        <User className="text-yellow-600 dark:text-yellow-400" /> Settings
      </h1>

      {/* User Info */}
      <section className="bg-white dark:bg-slate-800 border border-yellow-100 dark:border-yellow-500/20 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">User Info</h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
          <p><span className="font-medium text-gray-800 dark:text-gray-100">Name:</span> Aditi Avinash</p>
          <p><span className="font-medium text-gray-800 dark:text-gray-100">Email:</span> aditi@example.com</p>
          <p><span className="font-medium text-gray-800 dark:text-gray-100">Level:</span> 17</p>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white dark:bg-slate-800 border border-yellow-100 dark:border-yellow-500/20 rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-4">Preferences</h2>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            {darkMode ? <Moon className="text-yellow-500" /> : <Sun className="text-yellow-500" />}
            <span>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ring-1 ${
              darkMode 
                ? 'bg-yellow-500 text-white ring-yellow-500' 
                : 'bg-gray-100 text-gray-800 ring-gray-300 dark:bg-slate-700 dark:text-white dark:ring-slate-600'
            }`}
          >
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            {notificationsEnabled ? <Bell className="text-yellow-500" /> : <BellOff className="text-yellow-500" />}
            <span>Daily Notifications</span>
          </div>
          <button
            onClick={toggleNotifications}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ring-1 ${
              notificationsEnabled 
                ? 'bg-yellow-500 text-white ring-yellow-500' 
                : 'bg-gray-100 text-gray-800 ring-gray-300 dark:bg-slate-700 dark:text-white dark:ring-slate-600'
            }`}
          >
            {notificationsEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Theme Selection Placeholder */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            <Palette className="text-yellow-500" />
            <span>Theme</span>
          </div>
          <select className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 dark:text-white ring-1 ring-gray-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option>Yellow</option>
            <option>Dark</option>
            <option>Minimal</option>
          </select>
        </div>
      </section>

      {/* Account Settings */}
      <section className="bg-white dark:bg-slate-800 border border-yellow-100 dark:border-yellow-500/20 rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-4">Account</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            <Lock className="text-yellow-500" />
            <span>Change Password</span>
          </div>
          <button className="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 hover:underline transition duration-200">
            Update
          </button>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <button className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition duration-200">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>

          <button className="flex items-center space-x-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold transition duration-200">
            <Trash2 size={18} />
            <span>Delete Account</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
