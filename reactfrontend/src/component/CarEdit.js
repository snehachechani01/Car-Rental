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
    photo: null
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!car.brand) {
      formIsValid = false;
      errors['brand'] = 'Please enter a brand.';
    }

    if (!car.model) {
      formIsValid = false;
      errors['model'] = 'Please enter a model.';
    }

    if (!car.price) {
      formIsValid = false;
      errors['price'] = 'Please enter a price.';
    }

    if (!car.fuelType) {
      formIsValid = false;
      errors['fuelType'] = 'Please enter a fuel type.';
    }

    if (!car.gearbox) {
      formIsValid = false;
      errors['gearbox'] = 'Please enter a gearbox type.';
    }

    if (!photo) {
      formIsValid = false;
      errors['photo'] = 'Please upload a photo.';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('brand', car.brand);
      formData.append('model', car.model);
      formData.append('price', car.price);
      formData.append('fuelType', car.fuelType);
      formData.append('gearbox', car.gearbox);
      formData.append('photo', photo);

      axios
        .post(`http://localhost:8000/api/cars/${carId}/edit`, formData)
        .then((response) => {
          console.log(response);
          // Navigate to the CarList component
          window.location.href = '/CarTable';
          alert('Car updated successfully!');
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
          <div className="error">{errors.brand}</div>
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
          <div className="error">{errors.model}</div>
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
           <div className="error">{errors.price}</div>
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
           <div className="error">{errors.fuelType}</div>
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
           <div className="error">{errors.gearbox}</div>
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