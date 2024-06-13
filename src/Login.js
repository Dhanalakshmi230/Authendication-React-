import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons
import './Login.css';

const Login = () => {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/user/login', {
                userName: fullName,
                password: password,
            });

            console.log(response.data); // Log the entire response data for debugging

            const responseBody = response.data.data.body; // Adjusted to access the correct level of response data

            if (responseBody && responseBody.jwt) {
                localStorage.setItem('token', responseBody.jwt); // Store the token
                localStorage.setItem('username', responseBody.userName); // Store the username

                // Determine user role and navigate accordingly
                if (responseBody.role === 'USER') {
                    navigate('/usertable');
                } else if (responseBody.role === 'ADMIN') {
                    navigate('/admintable');
                } else {
                    setMessage('Unexpected user role');
                    console.error('Unexpected user role', responseBody.role);
                }
            } else {
                setMessage('Unexpected response structure');
                console.error('Unexpected response structure', response.data);
            }
        } catch (error) {
            setMessage('Error logging in');
            console.error('There was an error!', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="User Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <div className="password-input ">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        className=''
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="password-toggle icon-possition" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEye:faEyeSlash  } />
                    </span>
                </div>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
