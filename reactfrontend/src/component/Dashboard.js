import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './Dashboard.css';
import Navigation from './Navigation';

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.log(error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }

  // Check if the user is authorized
  const isUser = sessionStorage.getItem('isUser');

  // Redirect unauthorized users to the login page
  useEffect(() => {
    if (!isUser) {
      alert("unauthorized user, please login first")
      window.location.href = '/login';
    }
  }, [isUser]);

  return (
    <div className="home">
    <Navigation handleLogout={handleLogout} />
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/car5.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/car3.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/car4.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
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
    
      <footer className="footer">
                <div className="footer-col">
                    <h3>GET TO KNOW US</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press Releases</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>CONNECT WITH US</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>CONSUMER POLICY</h3>
                    <ul>
                        <li><a href="#">Return Policy</a></li>
                        <li><a href="#">Terms Of Use</a></li>
                        <li><a href="#">Security</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h3>HELP</h3>
                    <ul>
                        <li><a href="#">Payments</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Returns</a></li>
                    </ul>
                </div>
                <div className="copyright">
                <p>© Copyright 2023 My Shop. All rights reserved.</p>
                </div>
            </footer>

    </div>
  );
}

export default Home;