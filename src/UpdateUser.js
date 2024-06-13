import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.userData) {
      const { userName, email, mobileNo, Authorities } = location.state.userData.Details;
      setFullName(userName);
      setEmail(email);
      setMobileNo(mobileNo);
      setRole(Authorities[0].authority);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const token = localStorage.getItem('token');
    const userId = location.state.userData.Details.userId;
    const userData = {
      userId,
      userName: fullName,
      email: email,
      mobileNo: mobileNo,
      password: password,
      confirmPassword: confirmPassword,
      userRole: role,
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
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Update</button>
        {message && <p>{message}</p>}
      </form>
      <p>
        You have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default UpdateUser;
