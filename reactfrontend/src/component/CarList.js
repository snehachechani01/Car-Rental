import React, { useState } from 'react';
import axios from 'axios';

function RentForm(props) {
  const [rentDate, setRentDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(props.car?.id);
    console.log(props.userId);

    formData.append('rent_date', rentDate);
    formData.append('return_date', returnDate);
    formData.append('car_id', props.car?.id || '');
    formData.append('user_id', props.userId || '');
    formData.append('price', props.car?.price || '');

    axios.post('http://localhost:8000/api/rents/add', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="rent-form">
      <h2>Rent Car</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rent-date">Rent Date:</label>
        <input type="datetime-local" id="rent-date" value={rentDate} onChange={(event) => setRentDate(event.target.value)} required />

        <label htmlFor="return-date">Return Date:</label>
        <input type="datetime-local" id="return-date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required />

        <button type="submit">Submit</button>
        <button onClick={props.onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default RentForm;
