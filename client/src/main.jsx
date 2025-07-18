import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './Dashboard.jsx';
import Layout from './Layout.jsx';
import Homepage from './Homepage.jsx';
import Tasks from './components/appComponents/habit/Tasks.jsx'; 
import SettingsTab from './components/appComponents/settings/SettingsTab.jsx'
import CalendarHeatmap from './components/appComponents/calendar/CalendarTab.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<SettingsTab />} />
          <Route path="calendar" element={<CalendarHeatmap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
