import React, { useState } from 'react';

const AddReminderModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !type || !date || !time) return;

    onSave({ title, type, date, time });
    setTitle('');
    setType('');
    setDate('');
    setTime('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Reminder</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Type</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. Birthday, Project"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600">Date</label>
              <input
                type="date"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600">Time</label>
              <input
                type="time"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-black text-gray-100 border-black rounded-md hover:bg-white hover:text-black hover:border-black hover:border transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Save Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;
