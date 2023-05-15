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
  const [errors, setErrors] = useState({});

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
        alert('Car created successfully!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!brand) {
      errors.brand = 'Please enter a brand name';
      isValid = false;
    }

    if (!model) {
      errors.model = 'Please enter a car model';
      isValid = false;
    }

    if (!price) {
      errors.price = 'Please enter a price';
      isValid = false;
    }

    if (isNaN(price)) {
      errors.price = 'Please enter a valid price';
      isValid = false;
    }

    if (!fuelType) {
      errors.fuelType = 'Please select a fuel type';
      isValid = false;
    }

    if (!gearbox) {
      errors.gearbox = 'Please select a gearbox';
      isValid = false;
    }

    if (!photo) {
      errors.photo = 'Please select a photo';
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  return (
    <form onSubmit={handleSubmit} className="create-car-form">
      <div className="container">
        <label htmlFor="brand">Car Brand Name:</label>
        <input type="text" id="brand" name="brand" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        {errors.brand && <span className="error">{errors.brand}</span>}
      </div>
      <div className="container">
        <label htmlFor="model">Car Model:</label>
        <input type="text" id="model" name="model" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} required />
        {errors.model && <span className="error">{errors.model}</span>}
      </div>
      <div className="container">
        <label htmlFor="price">Car Price per day for rental:</label>
        <input type="number" id="price" name="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>
      <div className="container">
        <label htmlFor="fuelType">Car fuel type:</label>
        <select id="fuelType" name="fuelType"  className="form-control" value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
          <option value="">Select fuel type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          {errors.fuelType && <span className="error">{errors.fuelType}</span>}
        </select>
      </div>

      <div className="container">
        <label htmlFor="gearbox">Car gearbox:</label>
        <select id="gearbox" name="gearbox"  className="form-control" value={gearbox} onChange={(e) => setGearbox(e.target.value)} required>
          <option value="">Select gearbox</option>
          <option value="electric">Electric</option>
          <option value="manual">Manual</option>
          {errors.gearbox && <span className="error">{errors.gearbox}</span>}
        </select>
      </div>

      <div className="container">
        <label htmlFor="availability">Car availability (true/false):</label>
        <input type="checkbox" id="availability" name="availability"  checked={availability} onChange={(e) => setAvailability(Number(e.target.checked))} />
      </div>
      
      <div className="container">
        <label htmlFor="photo">Car Photo:</label>
        <input type="file" id="photo" name="photo"  className="form-control" onChange={(e) => setPhoto(e.target.files[0])} required />
        {errors.photo && <span className="error">{errors.photo}</span>}
      </div>
      <button type="submit">Create Car</button>
    </form>
  );
};

export default CreateCar;
