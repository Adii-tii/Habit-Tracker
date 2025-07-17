import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const PomodoroTimer = ({ workDuration = 2, breakDuration = 5 }) => {
  const [secondsLeft, setSecondsLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");

  const intervalRef = useRef(null);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setSecondsLeft(workDuration * 60);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            const nextMode = mode === "work" ? "break" : "work";
            setMode(nextMode);
            return nextMode === "work" ? workDuration * 60 : breakDuration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60).toString().padStart(2, "0");
    const secsLeft = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${secsLeft}`;
  };

  const progress = ((mode === "work" ? workDuration * 60 : breakDuration * 60) - secondsLeft) /
    (mode === "work" ? workDuration * 60 : breakDuration * 60);

  return (
    <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
      <div className="mb-4">
        <h2
          className={`text-sm font-semibold uppercase tracking-widest ${
            mode === "work" ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {mode === "work" ? "Focus Mode" : "Break Mode"}
        </h2>
        <p className="text-xs text-gray-500">{mode === "work" ? "Time to concentrate!" : "Take a breath 🌿"}</p>
      </div>

     <div className="grid grid-cols-2 gap-2 items-center">
        {/* Timer Circle */}
        <div className="relative w-36 h-36 mx-auto">
          <svg className="absolute top-0 left-0 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="60"
              fill="none"
              stroke="#facc15"
              strokeWidth="10"
              strokeDasharray="377"
              strokeDashoffset={377 - 377 * progress}
              strokeLinecap="round"
              transform="rotate(-90 72 72)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-yellow-500">
            {formatTime(secondsLeft)}
          </div>
        </div>  

        {/* Controls */}
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            onClick={toggleTimer}
            className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 shadow-md transition"
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 shadow-md transition"
          >
            <RotateCcw size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
