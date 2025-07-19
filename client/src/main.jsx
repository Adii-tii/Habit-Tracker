import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Dashboard from './Dashboard.jsx';
import Layout from './Layout.jsx';
import Homepage from './Homepage.jsx';
import Tasks from './components/appComponents/habit/Tasks.jsx';
import SettingsTab from './components/appComponents/settings/SettingsTab.jsx';
import Analytics from './components/appComponents/analytics/Analytics.jsx';
import AISuggestions from './components/appComponents/ai/AISuggestions.jsx';

import { UserProvider } from './components/UserContext.jsx';  // ✅ import the context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="ai-suggestions" element={<AISuggestions />} />
            <Route path="settings" element={<SettingsTab />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
