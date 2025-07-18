import React, { useState } from 'react';
import { Moon, Sun, Bell, BellOff, LogOut, Trash2 } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {/* User Info */}
      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">User Info</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Name:</span> Aditi Avinash</p>
          <p><span className="font-medium">Email:</span> aditi@example.com</p>
          <p><span className="font-medium">Level:</span> 17</p>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Preferences</h2>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-700">
            {darkMode ? <Moon /> : <Sun />}
            <span>Dark Mode</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg transition ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            {notificationsEnabled ? <Bell /> : <BellOff />}
            <span>Daily Notifications</span>
          </div>
          <button
            onClick={toggleNotifications}
            className={`px-4 py-2 rounded-lg transition ${
              notificationsEnabled ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {notificationsEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </section>

      {/* Account Actions */}
      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Account</h2>

        <div className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>

          <button className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium">
            <Trash2 size={18} />
            <span>Delete Account</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
