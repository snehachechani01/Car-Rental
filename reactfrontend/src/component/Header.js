import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to='/Registration'>Sign Up</Link>
            </li>
            <li>
              <Link to='/Login'>Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1>Welcome to my App!</h1>
      <p>Please choose an option below:</p>
    </div>
  );
};

export default HomePage;
