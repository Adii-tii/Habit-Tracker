import React, { useState } from 'react';

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit({ feedback, email });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send feedback. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border-2 border-yellow-400">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Thank you!</h2>
          <p className="text-gray-700 mb-6">Your feedback has been sent. We appreciate your help in making HabitTracker better!</p>
          <button onClick={onClose} className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow transition-colors">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border-2 border-yellow-400">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Send Feedback</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows={4}
          placeholder="Your feedback..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow"
            disabled={loading}
          >Cancel</button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow"
            disabled={loading}
          >{loading ? 'Sending...' : 'Send'}</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackModal; 