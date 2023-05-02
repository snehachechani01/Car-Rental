import React, { useState } from 'react';
import axios from 'axios';
import './CreateCar.css';
const CreateCar = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState(''); // set initial value to 'petrol'
  const [gearbox, setGearbox] = useState(''); 
  const [availability, setAvailability] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('price', price);
    formData.append('fuelType', fuelType);
    formData.append('gearbox', gearbox);
    formData.append('availability', availability);
    formData.append('photo', photo);

    axios.post('http://localhost:8000/api/cars', formData)
      .then(response => {
        console.log(response.data);
        // Redirect to the car table page
        window.location.href = '/CarTable';
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Car Brand Name:</label>
        <input type="text" id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="model">Car Model:</label>
        <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="price">Car Price per day for rental:</label>
        <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
  <label htmlFor="fuelType">Car fuel type:</label>
  <select id="fuelType" name="fuelType" value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
    <option value="">Select fuel type</option>
    <option value="petrol">Petrol</option>
    <option value="diesel">Diesel</option>
  </select>
</div>

<div>
  <label htmlFor="gearbox">Car gearbox:</label>
  <select id="gearbox" name="gearbox" value={gearbox} onChange={(e) => setGearbox(e.target.value)} required>
    <option value="">Select gearbox</option>
    <option value="electric">Electric</option>
    <option value="manual">Manual</option>
  </select>
</div>

      <div>
        <label htmlFor="availability">Car availability (true/false):</label>
        <input type="checkbox" id="availability" name="availability" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
      </div>
      <div>
        <label htmlFor="photo">Car Photo:</label>
        <input type="file" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0])} required />
      </div>
      <button type="submit">Create Car</button>
    </form>
  );
};

export default CreateCar;
