import React from "react";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
//rfce react functions components export
function Header() {
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" colapseOnselect>
          <Container>
            <Navbar.Brand href="#home">E-Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"> </i>Cart
                </Nav.Link>
                <Nav.Link href="/cart">
                  <i className="fas fa-user"> </i>Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
