import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Settings = () => {
  const [settings, setSettings] = useState({
    domain: '',
    title: 'TitleCTF',
    startDate: '2000-01-01 00:00:00',
    finishDate: '2000-01-02 00:00:00'
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings functionality not implemented yet');
  };

  const handleReset = () => {
    setSettings({
      domain: '',
      title: 'TitleCTF',
      startDate: '2000-01-01 00:00:00',
      finishDate: '2000-01-02 00:00:00'
    });
  };

  return (
    <DashboardLayout>
      <h1 style={{ color: 'lightblue' }}>Settings</h1>
      <br />
      <p className="text-danger" style={{ color: 'red' }}>NOT IMPLEMENTED YET!</p>
      <br />
      <p>Modify settings</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Domain</label>
          <input
            type="text"
            name="domain"
            value={settings.domain}
            onChange={handleChange}
            placeholder="localhost"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={settings.title}
            onChange={handleChange}
            placeholder="TitleCTF"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Start Date</label>
          <input
            type="text"
            name="startDate"
            value={settings.startDate}
            onChange={handleChange}
            placeholder="2000-01-01 00:00:00"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Finish Date</label>
          <input
            type="text"
            name="finishDate"
            value={settings.finishDate}
            onChange={handleChange}
            placeholder="2000-01-02 00:00:00"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <button type="button" className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
      </form>
    </DashboardLayout>
  );
};

export default Settings;
