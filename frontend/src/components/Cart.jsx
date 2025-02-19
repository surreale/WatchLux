import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h2>Kosár</h2>
      {cart.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.oraaz} className="cart-item">
              <img src={`/images/${item.kep1}`} alt={item.megnevezes} className="cart-image" />
              <div className="cart-details">
                <h3>{item.megnevezes}</h3>
                <p>Ár: {item.ar} Ft</p>
                <button className="remove-button" onClick={() => removeFromCart(item.oraaz)}>❌ Eltávolítás</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="checkout-button" onClick={() => navigate("/")}>Vásárlás folytatása</button>
    </div>
  );
};

export default Cart;
