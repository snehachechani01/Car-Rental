import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateRental = () => {
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const {id:carId} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem('user_Id');
    const rentalData = {
      rental_date: rentalDate,
      return_date: returnDate,
      user_id: userId,
      car_id: carId,
    };

    axios.post('http://localhost:8000/api/rentals', rentalData)
      .then(response => {
        console.log(response.data);
        // Redirect to the rental list page
        window.location.href = '/RentalList';
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
      <button type="submit">Create Rental</button>
    </form>
  );
};

export default CreateRental;
