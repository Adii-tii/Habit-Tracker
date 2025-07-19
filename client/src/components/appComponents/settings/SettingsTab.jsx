import React from 'react';
import { LogOut, Trash2, Lock, User } from 'lucide-react';

const Settings = () => {
  // Dummy user info (replace with real user context/props as needed)
  const user = {
    name: 'Aditi Avinash',
    email: 'aditi@example.com',
    level: 17,
  };

  return (
    <div className="w-full min-h-screen bg-white space-y-6">
      <div className="flex justify-between items-center pb-4 mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* User Info Card */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Info</h2>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><span className="font-medium text-gray-800">Name:</span> {user.name}</p>
            <p><span className="font-medium text-gray-800">Email:</span> {user.email}</p>
            <p><span className="font-medium text-gray-800">Level:</span> {user.level}</p>
          </div>
        </section>

        {/* Account Settings */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Account</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-700">
              <Lock className="text-yellow-500" />
              <span>Change Password</span>
            </div>
            <button className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold transition">Update</button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold transition">
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
            <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-semibold transition">
              <Trash2 size={18} />
              <span>Delete Account</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
