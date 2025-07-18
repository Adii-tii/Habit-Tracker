import React from "react";
import { Home, Goal, Settings, BarChart3, CheckSquare, Target, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import logo from '../../../assets/logo.png';
import { useNavigate, useLocation} from "react-router-dom";


const Sidebar = ({ isNavCollapsed, setIsNavCollapsed, userName, userLevel }) => {
  const navigate = useNavigate();
  const location = useLocation();


  const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`${isNavCollapsed ? 'w-[90px]' : 'w-72'} bg-black shadow-lg transition-all duration-100 flex flex-col border-r border-gray-200 h-screen sticky top-0`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className={` text-white font-bold text-xl px-4 py-1 rounded-lg ${isNavCollapsed ? 'text-sm px-2 py-1' : ''}`}>
            {isNavCollapsed ? 'L' : 
            <img className="w-[70px] h-auto hover:scale-105 transition duration-300" src={logo} onClick={() => navigate('/')} />}
          </div>
          <button 
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            className="p-2 hover:bg-yellow-500 bg-gray-300 rounded-lg transition-colors"
          >
            {isNavCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <button 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                ${location.pathname === item.path ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon />
              {!isNavCollapsed && <span className="font-medium">{item.label}</span>}
            </button>

            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
            {userName[0] + userName.split(' ')[1][0]}
          </div>
          {!isNavCollapsed && (
            <div className="flex-1">
              <p className="font-medium text-gray-300">{userName}</p>
              <p className="text-sm text-gray-500">Level {userLevel}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
