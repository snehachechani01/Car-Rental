import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/login', data);
      console.log("data",response.data);
      sessionStorage.setItem('userId', response.data.user_id);

      if (response.data.isAdmin===true) {
        navigate('/CarTable');
      } else {
        navigate('/Dashboard');
      }
      window.alert('Login successful!');
    } catch (error) {
      console.log(error.response);

      if (error.response.status === 401) {
        window.alert('Invalid email or password. Please try again.');
      } else if (error.response.status === 500) {
        window.alert('An unexpected error occurred. Please try again later.');
      } else {
        window.alert('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div>
      <h1>Login</h1>
      <form class="loginform" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', width: '100%' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', width: '100%' }} />
        </div>
        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', width: '100%' }}>Submit</button>
      </form>
    </div>
  );
};

export default Login;