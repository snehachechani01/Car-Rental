import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img src="images/car12.jpeg" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto justify-content-end">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Cars</Nav.Link>
          <Nav.Link href="#">About Us</Nav.Link>
          <Nav.Link href="#">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
