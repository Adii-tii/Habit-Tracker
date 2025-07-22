import React, { useState, useEffect } from "react";
import {
  Home,
  Settings,
  BarChart3,
  CheckSquare,
  Target,
  Calendar,
  ChevronLeft,
  Menu,
  MessageCircle,
  LogOut,
} from "lucide-react";
import logo from "../../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";
import FeedbackModal from '../ui/FeedbackModal';

const Sidebar = ({ isNavCollapsed, setIsNavCollapsed, userLevel, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  // Persist sidebar collapsed state
  useEffect(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    if (stored === null) {
      setIsNavCollapsed(true); // Default to collapsed
    } else {
      setIsNavCollapsed(stored === 'true');
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isNavCollapsed);
  }, [isNavCollapsed]);

  const { logout } = useUser();
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: MessageCircle, label: "AI Suggestions", path: "/ai-suggestions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // Responsive sidebar classes
  const sidebarBase =
    "flex flex-col h-screen sticky top-0 bg-black border-r border-gray-800 shadow-lg transition-all duration-300 z-40";
  const sidebarWidth = isNavCollapsed ? "w-[80px]" : "w-72";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Feedback submit handler
  const handleFeedbackSubmit = async ({ feedback, email }) => {
    await fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback, email }),
    });
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black bg-opacity-80 p-2 rounded-full text-white hover:text-yellow-500 shadow-lg"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div
        className={`${sidebarBase} ${sidebarWidth} 
          md:sticky md:top-0 md:relative md:translate-x-0 md:block
          ${mobileOpen ? "fixed left-0 top-0 bottom-0 translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ minWidth: isNavCollapsed ? 80 : 288 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 min-h-[88px]">
          <div className="flex items-center overflow-hidden">
            <img
              src={logo}
              alt="Logo"
              className={`h-12 pl-4 cursor-pointer hover:scale-105 transition-all duration-300 ${
                isNavCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
              }`}
              onClick={() => navigate("/")}
            />
          </div>
          <button
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            className="bg-transparent p-2 text-white hover:text-yellow-500 transition-colors flex-shrink-0 hidden md:block"
            aria-label="Toggle sidebar"
          >
            {isNavCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        {/* Navigation - This takes up the remaining space */}
        <div className="flex-1 px-2 py-4 overflow-y-auto scrollbar-hide">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMobileOpen(false);
                    }}
                    className={`group w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 relative
                      ${isNavCollapsed ? "justify-center" : "justify-start"}
                      ${isActive ? "bg-yellow-500 text-gray-900 font-bold" : "text-gray-300 hover:bg-gray-800"}
                    `}
                  >
                    {/* Yellow bar for active */}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded bg-yellow-200" />
                    )}
                    <Icon size={20} className="flex-shrink-0 z-10" />
                    <span className={`font-medium transition-all duration-300 whitespace-nowrap ${
                      isNavCollapsed ? 'opacity-0 w-0 overflow-hidden ml-0' : 'opacity-100 w-auto ml-3'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Absolute bottom user card and logout */}
        <div className="w-full absolute left-0 bottom-0 pb-4 px-4">
          {/* User Info and Logout - only show logout when not collapsed */}
          <div
            className={`rounded-xl px-3 py-2 flex items-center bg-gray-900 gap-3 mb-2 transition-all duration-300 ${
              isNavCollapsed ? "justify-center" : ""
            }`}
          >
            <div
              className="flex items-center justify-center bg-yellow-500 text-black font-bold text-lg rounded-full flex-shrink-0 shadow-md border-2 border-yellow-300"
              style={{
                minWidth: "48px",
                minHeight: "48px",
                maxWidth: "48px",
                maxHeight: "48px",
              }}
            >
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className={`flex flex-col transition-all duration-300 overflow-hidden ${
              isNavCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto'
            }`}>
              <span className="text-gray-100 font-semibold truncate whitespace-nowrap text-base">
                {userName}
              </span>
              <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                Level {userLevel}
              </span>
            </div>
          </div>
          {/* Feedback Button */}
          {!isNavCollapsed && (
            <button
              onClick={() => setShowFeedback(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 font-semibold mb-2 transition-all"
            >
              <span>Send Feedback</span>
            </button>
          )}
          {/* Logout Button */}
          {!isNavCollapsed && (
          <button
            onClick={() => {
              logout();
              navigate("/");
              setMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-red-400 font-semibold transition-all"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
          )}
        </div>
        
        {/* Custom scrollbar styles */}
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
      <FeedbackModal open={showFeedback} onClose={() => setShowFeedback(false)} onSubmit={handleFeedbackSubmit} />
    </>
  );
};

export default Sidebar;
