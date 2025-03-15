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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Ha lefelé görget, elrejti a Navbar-t
      } else {
        setShowNavbar(true); // Ha felfelé görget, megjeleníti
      }
      setLastScrollY(window.scrollY);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu-container")) {
        setShowUserMenu(false); // Ha a felhasználói menün kívül kattint, bezárja
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside); // Külső kattintás figyelése

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
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
        location.pathname !== "/kedvencek" &&
        location.pathname !== "/checkout" && <HeroText />}

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
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        window.location.href = `/products?search=${searchQuery.trim()}`;
      }
    }
  }}
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
