import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Importáljuk a useLocation hookot
import Logo from "./logo.png";
import Login from "./Login";
import Register from "./Register";
import SearchIcon from "./search.png";
import Kosar from "./kosar.jpeg";
import Felhasznalo from "./felhasznalo.jpeg";
import HeroText from "./HeroText"; // Animált szöveg
import "./Menu.css";

function Menu() {
  const location = useLocation(); // Aktuális útvonal lekérése
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
      {/* HeroText csak akkor jelenjen meg, ha nem a "/products" oldalon vagyunk */}
      {!location.pathname.startsWith("/product/") && location.pathname !== "/products" && <HeroText />}


      <Navbar expand="lg" className="bg-light navbar-custom" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={Logo} alt="Logo" className="logo" />
            <span className="brand-name">WatchLux</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-center">
              <Nav.Link as={Link} to="/">Főoldal</Nav.Link>
              <Nav.Link as={Link} to="/products">Termékek</Nav.Link>
            </Nav>
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
                        <Link to="/profil">Profil</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/logout">Kijelentkezés</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Nav.Link as={Link} to="/kosar">
                <img src={Kosar} alt="Kosár" className="kosar-icon" />
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login showLogin={showLogin} handleLoginClose={handleLoginClose} />
      <Register showRegister={showRegister} handleRegisterClose={handleRegisterClose} />
    </>
  );
}

export default Menu;
