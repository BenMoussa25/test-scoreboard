import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';
import ScoreboardTable from '../components/ScoreboardTable';
import ActivityFeed from '../components/ActivityFeed';
import FirstBloodNotification from '../components/FirstBloodNotification';
import { countdown } from '../utils/helpers';

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([]);
  const [activities, setActivities] = useState([]);
  const [config, setConfig] = useState({ title: 'TitleCTF', start_date: '', finish_date: '' });
  const [timer, setTimer] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Config fetch error:', err));

    socket.on('update', (data) => {
      setScoreboard(data);
    });

    socket.on('activity', (data) => {
      setActivities(prev => [...data, ...prev].slice(0, 100));
    });

    socket.on('first_blood', (data) => {
      if (data && data[0]) {
        setNotification(data[0]);
      }
    });

    return () => {
      socket.off('update');
      socket.off('activity');
      socket.off('first_blood');
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
    <div className="container-fluid">
      {notification && (
        <FirstBloodNotification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex-container">
        <div className="main-content">
          <h1 style={{ color: 'lightblue' }}>
            {config.title} Scoreboard
          </h1>
          <div id="countdown" style={{ paddingBottom: '1%' }}>
            {timer || 'Initializing timer...'}
          </div>
          <ScoreboardTable scoreboard={scoreboard} />
        </div>

        <div style={{ minWidth: '400px' }}>
          <h1 style={{ color: 'lightblue' }}>Activity</h1>
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
