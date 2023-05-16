import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Rent.css';
import Navigation from './Navigation';

const CreateRental = () => {
  const price = localStorage.getItem('price');
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const rentDateObj = new Date(rentalDate); const returnDateObj = new Date(returnDate); const timeDiff = returnDateObj.getTime() - rentDateObj.getTime(); const daysDiff = timeDiff / (1000 *3600*24); // number of milliseconds in a day 
  const totalPrice = daysDiff * price; 

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!rentalDate) {
      errors.rentalDate = 'Rental date is required';
    } else if (new Date(rentalDate) < new Date()) {
      errors.rentalDate = 'Rental date must be in the future';
    }

    if (!returnDate) {
      errors.returnDate = 'Return date is required';
    } else if (new Date(returnDate) < new Date()) {
      errors.returnDate = 'Return date must be in the future';
    } else if (new Date(returnDate) <= new Date(rentalDate)) {
      errors.returnDate = 'Return date must be after rental date';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const price = localStorage.getItem('price');
    const carId = localStorage.getItem('carId');
   
    const userId = sessionStorage.getItem('userId');
    const rentalData = {
      rental_date: rentalDate,
      return_date: returnDate,
      user_id: userId,
      car_id: carId,
      price: price,
    };

    axios.post('http://localhost:8000/api/rentals', rentalData)
      .then(response => {
        console.log(response.data);
        // Display an alert message
        alert('Your car for rent has been booked!');
        // Redirect to the dashboard
        window.location.href = '/dashboard';
      })
      .catch(error => {
        console.log(error);
        // Display an alert message
        alert('There was an error booking your car rental. Please try again later.');
      });
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rentalDate">Rental Date:</label>
        <input type="date" id="rentalDate" name="rentalDate" value={rentalDate} onChange={(e) => setRentalDate(e.target.value)} required />
        {/* Error message for rental date */}
        {errors.rentalDate && <div style={{ color: 'red' }}>{errors.rentalDate}</div>}
      </div>
      <div>
        <label htmlFor="returnDate">Return Date:</label>
        <input type="date" id="returnDate" name="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
        {/* Error message for return date */}
        {errors.returnDate && <div style={{ color: 'red' }}>{errors.returnDate}</div>}
      </div>
      <button type="submit">PAY RS{totalPrice}</button>
    </form>
    {/* Footer section */}
    <footer className="footer1">
      <div className="footer-col">
        <h3>GET TO KNOW US</h3>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press Releases</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>CONNECT WITH US</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>CONSUMER POLICY</h3>
        <ul>
          <li><a href="#">Return Policy</a></li>
          <li><a href="#">Terms Of Use</a></li>
          <li><a href="#">Security</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>HELP</h3>
        <ul>
          <li><a href="#">Payments</a></li>
          <li><a href="#">Shipping</a></li>
          <li><a href="#">Returns</a></li>
        </ul>
      </div>
      <div className="copyright">
        <p>© 2023 My Shop. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
};
    



export default CreateRental;