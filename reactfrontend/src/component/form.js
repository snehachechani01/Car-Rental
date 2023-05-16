import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Navbar from './Navigation';

import './Css/form.css';
import Footer from './footer';

function RentForm(props) {
  const [rentDate, setRentDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const userId = sessionStorage.getItem('userId');
  const Price = sessionStorage.getItem('Price');
  const navigate = useNavigate();

  const rentDateObj = new Date(rentDate);
  const returnDateObj = new Date(returnDate);
  const timeDiff = returnDateObj.getTime() - rentDateObj.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24); // number of milliseconds in a day
  const totalPrice = daysDiff * Price;

  const { id: carId } = useParams();
  const isUser = sessionStorage.getItem('user');
  // alert(id);

  const handleSubmit = (event) => {

    if (totalPrice > 1450000) {
      alert("You cannot rent the car for that long.");
      return;
    }

    if (isNaN(totalPrice) || totalPrice < 0) {
      alert("Invalid price calculation. Please check the rent dates.");
      return;
    }
    event.preventDefault();
    const formData = new FormData();
    formData.append('rent_date', rentDate);
    formData.append('return_date', returnDate);
    formData.append('car_id', carId);
    formData.append('user_id', userId);
    // formData.append('price', Price);

    axios
      .post('http://localhost:8000/api/rents/add', formData)
      .then((response) => {
        console.log(response.data);
        if(response.data.success===true){
          alert("Car Rented Sucessfully");
          navigate('/booked');
        }
        else{
          alert(response.data.error)
        }
        
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='main-form'>
      <Navbar />
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="rent-form">
        <h2>Rent Car</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="rent-date">Rent Date:</label>
            <input
              type="date"
              className="form-control"
              id="rent-date"
              value={rentDate}
              onChange={(event) => setRentDate(event.target.value)}
              min={today} // Set min attribute to today's date
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="return-date">Return Date:</label>
            <input
              type="date"
              className="form-control"
              id="return-date"
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              min={rentDate || today} // Set min attribute to rent date or today's date
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
            Pay {isNaN(totalPrice) ? '' : totalPrice}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default RentForm;