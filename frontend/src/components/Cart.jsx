import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Register from "./Register";
import Login from "./Login";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.ar) * (Number(item.mennyiseg) || 1),
    0
  );


const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const handleProceedToCheckout = () => {
  saveCartToLocalStorage();
  localStorage.setItem("cartBackup", JSON.stringify(cart)); // 🔥 Kosár mentése
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
      navigate("/checkout");
  } else {
      setShowModal(true);
  }
};


  return (
    <div className="cart-page">
      <h2 className="cl">Kosár</h2>
      {cart.length === 0 ? (
        <p className="cl">A kosár üres.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.oraaz} className="cart-item">
              <img
                src={`/images/${item.kep1}`}
                alt={item.megnevezes}
                className="cart-image clickable"
                onClick={() => navigate(`/product/${item.oraaz}`)}
              />
              <div className="cart-details">
                <h3 className="clickable" onClick={() => navigate(`/product/${item.oraaz}`)}>
                  {item.megnevezes}
                </h3>
                <hr />
                <p>Ár: {item.ar} Ft</p>
                <div className="quantity-control">
                  <label htmlFor={`quantity-${item.oraaz}`}>Mennyiség:</label>
                  <input
                    id={`quantity-${item.oraaz}`}
                    type="number"
                    min="1"
                    max="20"
                    value={item.mennyiseg || 1}
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value);
                      if (newQuantity >= 1 && newQuantity <= 20) {
                        updateCartQuantity(item.oraaz, newQuantity);
                      }
                    }}
                  />
                  <span> db</span>
                </div>
                <p>Összesen: {Number(item.ar) * (Number(item.mennyiseg) || 1)} Ft</p>
                <button className="remove-button" onClick={() => removeFromCart(item.oraaz)}>
                  Törlés
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="checkout-button" onClick={() => navigate("/products")}>
        Vásárlás folytatása
      </button>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Összesen: {totalPrice.toLocaleString()} Ft</h3>
          <button className="fizetes" onClick={handleProceedToCheckout}>
            Tovább a fizetéshez
          </button>
        </div>
      )}

      {/* Modal ablak a fizetési mód kiválasztásához */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Fizetés módja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hogyan szeretnéd folytatni a rendelést?</p>
          <div>
            <Button className="modal-buttons" onClick={() => navigate("/checkout")}>Vendégként folytatom</Button>
            <Button className="modal-buttons" onClick={() => { setShowLogin(true); setShowModal(false); }}>Bejelentkezés</Button>
            <Button className="modal-buttons" onClick={() => { setShowRegister(true); setShowModal(false); }}>Regisztráció</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Login showLogin={showLogin} handleLoginClose={() => setShowLogin(false)} onLoginSuccess={() => setShowLogin(false)} />
      
      <Register showRegister={showRegister} handleRegisterClose={() => setShowRegister(false)} />
    </div>
  );
};

export default Cart;
