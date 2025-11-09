import { Routes, Route } from 'react-router-dom';
import Scoreboard from './pages/Scoreboard';
import Activity from './pages/Activity';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logs from './pages/Logs';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Scoreboard />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/login" element={<Login />} />
      <Route path="/dashboard/logs" element={<Logs />} />
      <Route path="/dashboard/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
