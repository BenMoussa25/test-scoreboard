import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 style={{ color: 'lightblue' }}>Dashboard</h1>
      <p>
        This dashboard allows you to manage the scoreboard system:
        <br />- Check logs via <a href="/dashboard/logs">logs</a>
        <br />- Change some settings in <a href="/dashboard/settings">settings</a>
      </p>
      <div style={{ marginTop: '20px' }}>
        <button type="button" className="btn btn-success">
          Confirm changes
        </button>
        <button type="button" className="btn btn-danger">
          Reset
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
