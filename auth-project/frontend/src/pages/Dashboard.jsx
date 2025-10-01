import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎉 Welcome to the Dashboard!</h2>
      <p>This is a protected route. You are successfully logged in.</p>
      <button 
        onClick={handleSignOut}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;