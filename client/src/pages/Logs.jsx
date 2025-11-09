import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';
import DashboardLayout from '../components/DashboardLayout';

const Logs = () => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    socket.on('logs', (data) => {
      setLogs(data);
    });

    return () => {
      socket.off('logs');
    };
  }, []);

  return (
    <DashboardLayout>
      <h1 style={{ color: 'lightblue' }}>Logs</h1>
      <div className="logs-container">
        {logs || 'No logs available...'}
      </div>
    </DashboardLayout>
  );
};

export default Logs;
