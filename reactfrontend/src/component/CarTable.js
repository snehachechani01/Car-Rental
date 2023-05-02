// CarList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import './CarList.css';

const CarList = () => {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/cars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  const handleEdit = (carId) => {
    // Navigate to the EditCar component with the carId as a URL parameter
    window.location.href = `/CarEdit/${carId}/edit`;
  };
  // const handleEdit1 = (carId, newData) => {
  //   // Make a PUT request to update the car with the new data
  //   fetch(`/CarEdit/${carId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newData),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Navigate to the updated car's details page
  //       window.location.href = `/cars/${data.id}`;
  //     })
  //     .catch(error => console.error(error));
  // };
  
  
  
  const handleDelete = (carId) => {
    const confirmed = window.confirm('Are you sure you want to delete this car?');
    if (confirmed) {
      axios
        .delete(`http://localhost:8000/api/cars/${carId}`)
        .then((response) => {
          setCars(cars.filter((car) => car.id !== carId));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  return (
    <div className="car-list">
      <h2>Car List</h2>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Price per day</th>
            <th>Fuel Type</th>
            <th>Gearbox</th>
            <th>Availability</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>{car.fuelType}</td>
              <td>{car.gearbox}</td>
              <td>{car.availability ? 'Available' : 'Not Available'}</td>
            <td className="img-thread"><img src={`http://localhost:8000/storage/images/${car.photo}`} alt="Car Photo" /></td>
              <td>
                <button onClick={() => handleEdit(car.id)}>Edit</button>
                {/* <Link to={`${car.id}/edit`} className="edit-link">Edit</Link> */}
                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
