// src/components/UserTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username'); // Get the username from local storage

      if (!token || !username) {
        setError({ error: { reason: 'Token or username not found in local storage' } });
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data); // Assuming response.data is the user object
      } catch (error) {
        setError(error.response.data);
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error.error.reason}</p>
        <p>Timestamp: {error.timeStamp}</p>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.userName}</td>
                <td>{userData.email}</td>
                <td>{userData.mobileNo}</td>
                <td>{userData.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserTable;
