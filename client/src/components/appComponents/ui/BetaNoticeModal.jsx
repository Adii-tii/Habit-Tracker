import React from 'react';

const BetaNoticeModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border-2 border-yellow-400">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Welcome to HabitTracker Beta!</h2>
        <p className="text-gray-700 mb-6">
          This site is still under active development. You may encounter bugs or unfinished features.<br/><br/>
          We appreciate your patience and feedback as we work to improve the experience. Thank you for being an early user!
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default BetaNoticeModal; 
