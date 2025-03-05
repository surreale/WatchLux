import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h2 className="cl">Kosár</h2>
      {cart.length === 0 ? (
        <p className="cl">A kosár üres.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.oraaz} className="cart-item">
              <img src={`/images/${item.kep1}`} alt={item.megnevezes} className="cart-image" />
              <div className="cart-details">
                <h3>{item.megnevezes}</h3>
                <hr />
                <p>Ár: {item.ar} Ft</p>
                <p>Mennyiség: {item.mennyiseg} db</p> {/* 🔹 Mennyiség megjelenítése */}
                <p>Összesen: {item.ar * item.mennyiseg} Ft</p> {/* 🔹 Összegzés */}
                <button className="remove-button" onClick={() => removeFromCart(item.oraaz)}>Törlés</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="checkout-button" onClick={() => navigate("/products")}>Vásárlás folytatása</button>
    </div>
  );
};

export default Cart;
