import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import './Booked.css';

function Booked() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const userId = sessionStorage.getItem('userId');
  const isUser = sessionStorage.getItem('isUser');

  useEffect(() => {
    if(!isUser){
      alert("Unauthorized User");
      window.location.href = '/login';
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/booked?userid=${userId}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  const handleEndRide = async (carId) => {
    if (window.confirm("Are you sure you want to end this ride?")) {
      try {
        const response = await axios.post(`http://localhost:8000/api/remove/${carId}`);
        console.log(response.data);
        // Remove the car from the booked list
        setData(data.filter((car) => car.id !== carId));
        alert("Your ride ended sucessfully")
        navigate('/cars')
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  return (
    <div className='container-booked'>
    <div className='booked-main'>
      {/* <Navbar /> */}
        {data.length === 0 && <h1 className='h1-booked'>No car is booked yet</h1>}
        {data.length > 0 && (
          <div className="product-list">
              {data.map((product) => (
                  <div className="product" key={product.id}>
                      <h3>{product.brand}{product.model}</h3>
                      <img id="img"  src={`http://localhost:8000/storage/${product.image}`}  alt={product.name} />
                      <p>{product.fuel}</p>
                      <p>{product.price} Rs</p>
                      <button onClick={() => handleEndRide(product.car_id)}>End Ride</button>
                  </div>
              ))}
          </div>
        )}
     
    </div>
    {/* <Footer /> */}
    </div>
  );
}

export default Booked;