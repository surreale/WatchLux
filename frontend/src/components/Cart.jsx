import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔄 Összesített ár kiszámítása
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
              <img src={`/images/${item.kep1}`} alt={item.megnevezes} className="cart-image" />
              <div className="cart-details">
                <h3>{item.megnevezes}</h3>
                <hr />
                <p>Ár: {item.ar} Ft</p>
                <p>Mennyiség: {item.mennyiseg || 1} db</p>
                <p>Összesen: {Number(item.ar) * (Number(item.mennyiseg) || 1)} Ft</p>
                <button className="remove-button" onClick={() => removeFromCart(item.oraaz)}>Törlés</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button className="checkout-button" onClick={() => navigate("/products")}>Vásárlás folytatása</button>

      {/* 🔄 Jobb oldali sáv az összeggel és a fizetés gombbal */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Összesen: {totalPrice.toLocaleString()} Ft</h3>
          <button className="payment-button" onClick={() => navigate("/checkout")}>
            Tovább a fizetéshez
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
