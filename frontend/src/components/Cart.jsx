import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Összesített ár kiszámítása
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.ar) * (Number(item.mennyiseg) || 1), 0);

  return (
    <div className="cart-page">
      <h2 className="cl">Kosár</h2>
      {cart.length === 0 ? (
        <p className="cl">A kosár üres.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.oraaz} className="cart-item">
              {/* 🔹 Kép kattintható - visszanavigál a részletező oldalra */}
              <img 
                src={`/images/${item.kep1}`} 
                alt={item.megnevezes} 
                className="cart-image clickable" 
                onClick={() => navigate(`/product/${item.oraaz}`)}
              />
              <div className="cart-details">
                {/* 🔹 Termék neve kattintható - visszanavigál a részletező oldalra */}
                <h3 
                  className="clickable"
                  onClick={() => navigate(`/product/${item.oraaz}`)}
                >
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
                <button className="remove-button" onClick={() => removeFromCart(item.oraaz)}>Törlés</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button className="checkout-button" onClick={() => navigate("/products")}>Vásárlás folytatása</button>

      {/* Jobb oldali sáv az összeggel és a fizetés gombbal */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Összesen: {totalPrice.toLocaleString()} Ft</h3>
          <button className="fizetes" onClick={() => navigate("/checkout")}>
            Tovább a fizetéshez
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
