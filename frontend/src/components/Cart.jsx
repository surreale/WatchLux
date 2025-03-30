import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.ar) * (Number(item.mennyiseg) || 1),
    0
  );

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleProceedToCheckout = () => {
    saveCartToLocalStorage();
    localStorage.setItem("cartBackup", JSON.stringify(cart)); 
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cl">
  Kosár <span role="img" aria-label="cart">🛒</span>
</h2>

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
  <div className="info-row">
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
  </div>
  <button className="remove-button" onClick={() => removeFromCart(item.oraaz)}>
    Törlés
  </button>
</div>

            </div>
          ))}
        </div>
      )}

     

      {cart.length > 0 && (
        <div className="cart-summary">
        <h3>Összesen: {totalPrice.toLocaleString()} Ft</h3>
        <button className="fizetes" onClick={handleProceedToCheckout}>
          Tovább a fizetéshez
        </button>
        <button className="checkout-button" onClick={() => navigate("/products")}>
          Vásárlás folytatása
        </button>
      </div>
      )}

{showModal && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setShowModal(false)}
        style={{
          float: "right",
          background: "transparent",
          border: "none",
          fontSize: "20px",
        }}
      >
        ✕
      </button>
      <h2 className="modal-title">Fizetés módja</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Hogyan szeretnéd folytatni a rendelést?
      </p>
      <div className="modal-button-group">
        <button
          className="btn-primary"
          onClick={() => {
            setShowModal(false);
            navigate("/checkout");
          }}
        >
          Vendégként folytatom
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setShowModal(false);
            setShowLogin(true);
          }}
        >
          Bejelentkezés
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setShowModal(false);
            setShowRegister(true);
          }}
        >
          Regisztráció
        </button>
      </div>
    </div>
  </div>
)}


      <Login showLogin={showLogin} handleLoginClose={() => setShowLogin(false)} onLoginSuccess={() => setShowLogin(false)} />
      <Register showRegister={showRegister} handleRegisterClose={() => setShowRegister(false)} />
    </div>
  );
};

export default Cart;
