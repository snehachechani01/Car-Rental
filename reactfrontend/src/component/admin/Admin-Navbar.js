import { Link } from "react-router-dom";
import './css/Navbar-admin.css';
import { API_URL } from '../../utils/value.js'
import React from "react";
import axios from 'axios';

const AdminNavbar = () => {
  const handleLogout = () => {
    axios.post(`${API_URL}/logout`).then(() => {
      // Remove any items from local storage
      localStorage.clear();
      sessionStorage.clear();
      // Redirect the user to the login page
      window.location.href = '/login';
    }).catch((error) => {
      console.error(error);
    });
  };
  

  return (
    <>
      <nav className="admin-nav">
        <div className="logo-container">
          <Link to="/">
            <div className="logo">
              <a href="#">Car2Go</a>
            </div>
          </Link>
        </div>
        <ul className="list-nav">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Car</Link>
          </li>
          <li>
            <Link to="/live">Live Status</Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavbar;
