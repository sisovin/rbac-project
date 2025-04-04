import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>
      {user.roles.includes('admin') && (
        <div>
          <h3>Admin Panel</h3>
          <p>Manage users, roles, and permissions</p>
        </div>
      )}
      {user.roles.includes('user') && (
        <div>
          <h3>User Panel</h3>
          <p>View and update your profile</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
