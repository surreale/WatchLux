import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Form, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext"; // Kosár állapot importálása
import Logo from "./logo.png";
import Login from "./Login";
import Register from "./Register";
import SearchIcon from "./search.png";
import Kosar from "./kosar.jpeg";
import Felhasznalo from "./felhasznalo.jpeg";
import Kedvencek from "./kedvencek.jpeg";
import HeroText from "./HeroText";
import "./Menu.css";

function Menu() {
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Ha lefelé görget, elrejti a Navbar-t
      } else {
        setShowNavbar(true); // Ha felfelé görget, megjeleníti
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  return (
    <>
      {!location.pathname.startsWith("/product/") &&
        location.pathname !== "/products" &&
        location.pathname !== "/cart" &&
        location.pathname !== "/kedvencek" && <HeroText />}

      <Navbar
        expand="lg"
        className={`bg-light navbar-custom ${showNavbar ? "show" : "hide"}`}
        collapseOnSelect
      >
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
                      <li className="menu-item" onClick={handleRegisterShow}>Regisztráció</li>
                      <li className="menu-item" onClick={handleLoginShow}>Bejelentkezés</li>
                      <li className="menu-item"><Link to="/profil">Profil</Link></li>
                      <li className="menu-item"><Link to="/logout">Kijelentkezés</Link></li>
                    </ul>
                  </div>
                )}
              </div>
              <Nav.Link as={Link} to="/kedvencek" className="position-relative">
                <img src={Kedvencek} alt="Kedvencek" className="kosar-icon" />
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <img src={Kosar} alt="Kosár" className="kosar-icon" />
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
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
