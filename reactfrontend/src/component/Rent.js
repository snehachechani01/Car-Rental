import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rentalDate">Rental Date:</label>
        <input type="date" id="rentalDate" name="rentalDate" value={rentalDate} onChange={(e) => setRentalDate(e.target.value)} required />
        {errors.rentalDate && <div style={{ color: 'red' }}>{errors.rentalDate}</div>}
      </div>
      <div>
        <label htmlFor="returnDate">Return Date:</label>
        <input type="date" id="returnDate" name="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
        {errors.returnDate && <div style={{ color: 'red' }}>{errors.returnDate}</div>}
      </div>
      <button type="submit">PAY RS{totalPrice}</button>
    </form>
  );
};

export default CreateRental;
