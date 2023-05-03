import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateRental = () => {
  const price = localStorage.getItem('price');
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const rentDateObj = new Date(rentalDate); const returnDateObj = new Date(returnDate); const timeDiff = returnDateObj.getTime() - rentDateObj.getTime(); const daysDiff = timeDiff / (1000 *3600*24); // number of milliseconds in a day 
  const totalPrice = daysDiff * price; 
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
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
    });
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rentalDate">Rental Date:</label>
        <input type="date" id="rentalDate" name="rentalDate" value={rentalDate} onChange={(e) => setRentalDate(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="returnDate">Return Date:</label>
        <input type="date" id="returnDate" name="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
      </div>
      <button type="submit">PAY RS{totalPrice}</button>
    </form>
  );
};

export default CreateRental;
