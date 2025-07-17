import React from "react";
import { useEffect, useState} from "react";
import { Quote } from "lucide-react";

const MotivationalQuote = () => {
  const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Small steps every day lead to big results.", author: "Unknown" },
  ];
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 10000); // Change quote every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3 mb-4">
        <Quote size={24} className="text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Daily Inspiration</h3>
      </div>
      <p className="text-gray-700 italic">"{currentQuote.text}"</p>
      <p className="text-sm text-gray-500 mt-2">— {currentQuote.author}</p>
    </div>
  );
};

export default MotivationalQuote;