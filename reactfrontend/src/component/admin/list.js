import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './css/Dashboard.css';

function CarDashboard() {
  const [cars, setCars] = useState([]);
  const isAdmin = sessionStorage.getItem('admin');

  useEffect(() => {
    if (!isAdmin) {
      alert('Unauthorized User');
      window.location.href = '/login';
    }

    async function fetchData() {
      const response = await axios.get(`http://localhost:8000/api/cars`);
      setCars(response.data);
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?');

    if (confirmed) {
      axios
        .delete(`http://localhost:8000/api/cars/${id}`)
        .then((res) => {
          if (res.data.success === false && res.data.user === 'login') {
            alert('Unauthorized Access');
            window.location.href = '/';
          }
          console.log(res.data);
          alert(res.data.message);
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        })
        .catch((err) => {
          console.error(err);
          alert('Error deleting data');
        });
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/add/${id}?isEdit=true`;
  };

  return (
    <div>
      <div className="container-dash">
      <div style={{ textAlign: 'center' }}>
  <h1>All Cars</h1>
</div>

        {cars.length === 0 ? (
          <p>No cars added</p>
        ) : (
          <table className="car-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th>Gearbox</th>
                <th>Fuel</th>
                <th>Image</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.price}</td>
                  <td>{car.gearbox}</td>
                  <td>{car.fuel}</td>
                  <td>
                    <img src={`http://localhost:8000/storage/${car.image}`} alt="car image" />
                  </td>
                  <td>{car.available ? 'Yes' : 'No'}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(car.id)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(car.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CarDashboard;
