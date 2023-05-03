// EditCar.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditCar = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({
    brand: '',
    model: '',
    price: '',
    fuelType: '',
    gearbox: '',
    photo: '' // initialize photo as null
  });
  const [photo, setPhoto] = useState(null); 

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cars/${carId}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [carId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('brand', car.brand);
    formData.append('model', car.model);
    formData.append('price', car.price);
    formData.append('fuelType', car.fuelType);
    formData.append('gearbox', car.gearbox);
    formData.append('photo', car.photo); 
    axios
      .post(`http://localhost:8000/api/cars/${carId}/edit`, car)
      .then((response) => {
        console.log(response);
        // Navigate to the CarList component
        window.location.href = '/CarTable';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-car">
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price per day:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <input
            type="text"
            id="fuelType"
            name="fuelType"
            value={car.fuelType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gearbox">Gearbox:</label>
          <input
            type="text"
            id="gearbox"
            name="gearbox"
            value={car.gearbox}
            onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="photo">Car Photo:</label>
        <input type="file" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0])} required />
      </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCar;
