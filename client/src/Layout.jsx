import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/appComponents/layout/Sidebar';

const Layout = ({ userName, userLevel, isNavCollapsed, setIsNavCollapsed }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        userName={userName}
        userLevel={userLevel}
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
      />
      <div className="flex-1 p-8">
        <Outlet /> {/* This is where the current page (Dashboard, Tasks, etc.) will render */}
      </div>
    </div>
  );
};

export default Layout;
