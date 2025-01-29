import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Container } from "react-bootstrap";

import Logo from "./logo.png";
import Login from "./Login";
import Register from "./Register";
import SearchIcon from "./search.png";
import Kosar from "./kosar.jpeg";
import Felhasznalo from "./felhasznalo.jpeg";

import HeroText from "./HeroText"; // Importáljuk az animált szöveget
import "./Menu.css";

function Menu() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
    };
  
    if (showUserMenu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserMenu]);
  

  return (
    <>
      <HeroText /> {/* Animált szöveg */}
      <Navbar expand="lg" className="bg-light navbar-custom" collapseOnSelect>
        <Container fluid>
          {/* Logo és márkanév */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src={Logo} alt="Logo" className="logo" />
            <span className="brand-name">WatchLux</span>
          </Navbar.Brand>

          {/* Hamburger Menü Mobilon */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navigációs menü */}
            <Nav className="me-auto text-center">
              <Nav.Link href="#home">Főoldal</Nav.Link>
              <Nav.Link href="#termek">Termékek</Nav.Link>
            </Nav>

            {/* Keresőmező */}
            <Form className="search-bar">
              <div className="position-relative">
                <span className="search-icon-container">
                  <img src={SearchIcon} alt="Search Icon" className="search-icon" />
                </span>
                <Form.Control
                  type="search"
                  placeholder="Keressen karórát..."
                  aria-label="Search"
                  className="search-input"
                />
              </div>
            </Form>

            {/* Jobb oldal: Felhasználó ikon és kosár */}
            <div className="d-flex align-items-center user-cart-container">
              <div className="user-icon user-menu-container position-relative">
                <img
                  src={Felhasznalo}
                  alt="Felhasználó"
                  className="user-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUserMenu();
                  }}
                />
                {showUserMenu && (
                  <div className="user-menu-dropdown position-absolute bg-white rounded shadow">
                    <ul className="list-unstyled mb-0">
                      <li className="menu-item" onClick={handleRegisterShow}>
                        Regisztráció
                      </li>
                      <li className="menu-item" onClick={handleLoginShow}>
                        Bejelentkezés
                      </li>
                      <li className="menu-item">
                        <a href="#profil">Profil</a>
                      </li>
                      <li className="menu-item">
                        <a href="#kijelentkezes">Kijelentkezés</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Nav.Link href="#kosar">
                <img src={Kosar} alt="Kosár" className="kosar-icon" />
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login és Register modális ablakok */}
      <Login showLogin={showLogin} handleLoginClose={handleLoginClose} />
      <Register showRegister={showRegister} handleRegisterClose={handleRegisterClose} />
    </>
  );
}

export default Menu;
