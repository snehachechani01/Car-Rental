import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.log(error));
  }, []);
  return (
    <div>
      <header>
        <Container>
          <Row>
            <Col md={8}>
              <nav>
                {/* <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Cars</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><Button variant="primary">Book Now</Button></li>
                </ul> */}
              </nav>
            </Col>
          </Row>
        </Container>
      </header>
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
      <Container>
        <Row>
          {/* Loop through cars and display each one */}
          {cars.map((car) => (
            <Col md={4} key={car.id}>
              <img
                src={`http://localhost:8000/storage/images/${car.photo}`}
                alt={car.name}
                className="img-fluid"
              />
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <Button variant="primary" href="/rent">
                Rent Now
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
      <footer>
        <Container>
          <Row>
            <Col md={6}>
              <p>© 2023 Car Rental. All rights reserved.</p>
            </Col>
            <Col md={6}>
              <nav>
                <ul>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
