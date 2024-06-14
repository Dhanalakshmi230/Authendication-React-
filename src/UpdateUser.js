import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { username } = useParams(); // Get the username from the URL parameters

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const user = response.data;
        setUserId(user.Details.userId);
        setFullName(user.Details.userName);
        setEmail(user.Details.email);
        setMobileNo(user.Details.mobileNo);
        setRole(user.Authorities[0].authority);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Error fetching user data');
      }
    };

    fetchUserData();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const token = localStorage.getItem('token');
    const userData = {
      userName: fullName,
      email: email,
      mobileNo: mobileNo,
      password: password,
      confirmPassword: confirmPassword,
      userRole: role,
      userId: "9c83c95b-039e-43e2-8858-4a34ed84d626"
    };

    try {
      await axios.put(`http://localhost:8080/api/user/update`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('User updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Update User</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          readOnly // Make the input field read-only
        />
        <input
          type="text"
          placeholder="User Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Update</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UpdateUser;
