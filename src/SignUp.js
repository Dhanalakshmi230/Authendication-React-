// src/components/SignUp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './SignUp.css';
import UserTable from './UserTable'; // Import UserTable

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate(); 

  // Fetch users data on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/users');
      setUsers(response.data.users);
      console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!['Admin', 'User'].includes(role)) {
      setMessage('Invalid role selected');
      return;
    }

    const userData = {
      userName: fullName,
      email: email,
      mobileNo: mobileNo,
      password: password,
      role: role,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/user/register', userData);
      setMessage('User registered successfully!');
      localStorage.setItem('token', response.data.token);  
      fetchUsers(); // Fetch updated users data
      navigate('/'); 
    } catch (error) {
      setMessage('Error registering user');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <select 
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
      </form>
      <p>
        You have an account? <Link to="/">Login</Link>
      </p>
      
    </div>
  );
};

export default SignUp;
