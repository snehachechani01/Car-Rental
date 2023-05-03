import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
