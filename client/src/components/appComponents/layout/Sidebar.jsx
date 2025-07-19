import React from "react";
import {
  Home,
  Settings,
  BarChart3,
  CheckSquare,
  Target,
  Calendar,
  ChevronLeft,
  Menu,
} from "lucide-react";
import logo from "../../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isNavCollapsed, setIsNavCollapsed, userLevel, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`flex flex-col h-screen sticky top-0 bg-black border-r border-gray-800 shadow-lg transition-all duration-300 ${
        isNavCollapsed ? "w-[80px]" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 min-h-[88px]">
        <div className="flex items-center overflow-hidden">
          <img
            src={logo}
            alt="Logo"
            className={`w-[70px] h-auto cursor-pointer hover:scale-105 transition-all duration-300 ${
              isNavCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-[70px]'
            }`}
            onClick={() => navigate("/")}
          />
        </div>
        <button
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          className="bg-transparent p-2 text-white hover:text-yellow-500 transition-colors flex-shrink-0"
        >
          {isNavCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 py-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`group w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                    isNavCollapsed ? "justify-center" : "justify-start"
                  } ${
                    isActive
                      ? "bg-yellow-500 text-black"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className={`font-medium transition-all duration-200 whitespace-nowrap ${
                    isNavCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto ml-3'
                  }`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

          {/* User Info */}
      <div className="p-4 border-t border-gray-800">
        <div
          className={`rounded-xl px-3 py-2 flex items-center transition-all duration-200 ${
            isNavCollapsed ? "justify-center" : "bg-gray-900 gap-3"
          }`}
        >
          <div
            className="flex items-center justify-center bg-yellow-500 text-black font-bold text-sm rounded-full flex-shrink-0"
            style={{
              minWidth: "40px",
              minHeight: "40px",
              maxWidth: "40px",
              maxHeight: "40px",
            }}
          >
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className={`flex flex-col transition-all duration-200 overflow-hidden ${
            isNavCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
          }`}>
            <span className="text-gray-100 font-semibold truncate whitespace-nowrap">{userName}</span>
            <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">Level {userLevel}</span>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
