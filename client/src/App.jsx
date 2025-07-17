import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HabitTrackerDashboard from './Dashboard';
import Tasks from './components/appComponents/habit/Tasks';

const App = () => {
  const [userName] = useState('Aditi Avinash');
  const [userLevel] = useState(17);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            userName={userName}
            userLevel={userLevel}
            isNavCollapsed={isNavCollapsed}
            setIsNavCollapsed={setIsNavCollapsed}
          />
        }
      >
        <Route path="/dashboard" element={<HabitTrackerDashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
};

export default App;
