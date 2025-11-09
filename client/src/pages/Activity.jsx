import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';
import ActivityFeed from '../components/ActivityFeed';
import { countdown } from '../utils/helpers';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [config, setConfig] = useState({ title: 'TitleCTF', start_date: '', finish_date: '' });
  const [timer, setTimer] = useState('');

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Config fetch error:', err));

    socket.on('activity', (data) => {
      setActivities(prev => [...data, ...prev].slice(0, 100));
    });

    return () => {
      socket.off('activity');
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const result = countdown(config.start_date, config.finish_date);
      setTimer(result.text);
    }, 1000);

    return () => clearInterval(interval);
  }, [config]);

  return (
    <div className="container">
      <h1 style={{ color: 'lightblue' }}>{config.title} Activity</h1>
      <div id="countdown" style={{ paddingBottom: '1%' }}>
        {timer || 'Initializing timer...'}
      </div>
      <ActivityFeed activities={activities} />
    </div>
  );
};

export default Activity;
