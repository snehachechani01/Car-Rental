import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import './Car.css';

function Car() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container className='mt-5'>
      <Row xs={1} sm={2} md={4} className="g-4">
        {/* Loop through cars and display each one */}
        {cars.map((car) => (
          <Col md={4} key={car.id}>
            <div className="car-box">
              <img
                src={`http://localhost:8000/storage/images/${car.photo}`}
                alt={car.name}
                className="car-image"
              />
              <div className="car-details">
                <h3>{car.name}</h3>
                <p>{car.description}</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    localStorage.setItem('price', car.price);
                    localStorage.setItem('carId', car.id);
                    window.location.href = '/rent';
                  }}
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Car;
