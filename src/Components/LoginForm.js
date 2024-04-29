// src/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

 

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { userName, password });
      console.log(response.data);
      // Handle successful login, e.g., redirect to dashboard
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Login failed:', error.response.data);
        // Handle login failure, e.g., display error message
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        // Handle no response received
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        // Handle request setup error
      }
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
