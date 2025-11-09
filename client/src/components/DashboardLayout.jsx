import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <div className="flex-container">
        <div className="sidebar">
          <h3 style={{ color: 'lightblue', marginBottom: '20px' }}>
            Admin Dashboard
          </h3>
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/logs"
            className={location.pathname === '/dashboard/logs' ? 'active' : ''}
          >
            Logs
          </Link>
          <Link
            to="/dashboard/settings"
            className={location.pathname === '/dashboard/settings' ? 'active' : ''}
          >
            Settings
          </Link>
          <Link to="/" style={{ marginTop: '20px', borderTop: '1px solid #2a2b3b', paddingTop: '10px' }}>
            Back to Scoreboard
          </Link>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
