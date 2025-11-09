import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginToken, setLoginToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ login_token: loginToken })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '100px' }}>
      <h1 style={{ color: 'lightblue' }}>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login_token">Login Token</label>
          <input
            type="text"
            id="login_token"
            value={loginToken}
            onChange={(e) => setLoginToken(e.target.value)}
            placeholder="Enter admin token"
            required
          />
        </div>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        <button type="submit" className="btn btn-success" style={{ marginTop: '20px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
