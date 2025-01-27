import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Logo from './logo.png';
import Login from './Login';
import Register from './Register';
import {useNavigate} from "react-router-dom";
import './Menu.css';



function Menu() {

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => {setShowLogin(true); 
                                  //navigate("/login")
                                };

  const imageStyle = {
    width: "40px",
    height: "40px",
  };

  return (
    <>
      <Navbar expand="lg" className="bg-">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} style={imageStyle} alt="Logo" />
            WatchLux
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-animated" href="#home">Főoldal</Nav.Link>
              <Nav.Link className="nav-animated" href="#termek">Termékek</Nav.Link>
              <NavDropdown title="Felhasználók" id="basic-nav-dropdown" className="nav-animated">
                <NavDropdown.Item onClick={handleRegisterShow}>Regisztráció</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLoginShow}>Bejelentkezés</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Profil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Kijelentkezés</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login showLogin={showLogin} handleLoginClose={handleLoginClose} />
      <Register showRegister={showRegister} handleRegisterClose={handleRegisterClose}/>
    </>
  );
}

export default Menu;