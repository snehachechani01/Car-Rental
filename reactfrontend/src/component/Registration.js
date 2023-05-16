import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
  
    const namePattern = /^[a-zA-Z -]{1,20}$/;
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
    let errors = {};
  
    if (!name || !namePattern.test(name)) {
      errors['name'] = 'Please enter a valid name (No numbers allowed)';
    }
  
    if (!email || !emailPattern.test(email)) {
      errors['email'] = 'Please enter a valid email address';
    }
  
    if (!password || !passwordPattern.test(password)) {
      errors['password'] =
        'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.';
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    axios
      .post('http://localhost:8000/api/register', data)
      .then((response) => {
        console.log(response.data);
        alert('Registration successful!');
        navigate('/Login');
      })
      .catch((error) => {
        console.log(error.response.data);
        alert('Registration failed. Please try again.');
      });
  };
  
  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome to CarRentals!</h1>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginRight: '1rem' }}>
              <Link to='/Registration'>Sign Up</Link>
            </li>
            <li>
              <Link to='/Login'>Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors['name'] ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors['name'] && <div className="invalid-feedback">{errors['name']}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={`form-control ${errors['email'] ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors['email'] && <div className="invalid-feedback">{errors['email']}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${errors['password'] ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         

        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;