import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import "./Notification.css";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [showNotification, setShowNotification] = useState(false); //  Értesítés állapota
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.ar) * (Number(item.mennyiseg) || 1), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    if (Object.values(shippingInfo).some((value) => value.trim() === "")) {
      setShowNotification(true); //  Értesítés megjelenítése, ha üres mezők vannak
      setTimeout(() => setShowNotification(false), 3000); //  Értesítés eltűnik 3 másodperc múlva
      return;
    }
    alert("Sikeres fizetés! Köszönjük a vásárlást.");
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h2 className="cl">Fizetés</h2>
      {cart.length === 0 ? (
        <p className="cl">A kosár üres.</p>
      ) : (
        <div className="checkout-content">
          <div className="checkout-cart-summary">
            <h3>Termékek összegzése</h3>
            {cart.map((item) => (
              <div key={item.oraaz} className="checkout-item">
                <img src={`/images/${item.kep1}`} alt={item.megnevezes} className="checkout-image" />
                <div className="checkout-details">
                  <h4>{item.megnevezes}</h4>
                  <p>Ár: {Number(item.ar).toLocaleString()} Ft</p>
                  <p>Mennyiség: {item.mennyiseg || 1} db</p>
                  <p>Összesen: {Number(item.ar) * (Number(item.mennyiseg) || 1)} Ft</p>
                </div>
              </div>
            ))}
            <h3>Végösszeg: {totalPrice.toLocaleString()} Ft</h3>
          </div>

          <div className="checkout-shipping">
            <h3>Szállítási adatok</h3>
            <form className="shipping-form">
              <input
                type="text"
                name="name"
                placeholder="Teljes név*"
                value={shippingInfo.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail*"
                value={shippingInfo.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Cím*"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Város*"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Irányítószám*"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Telefonszám*"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                required
              />
            </form>

            <button className="payment-button" onClick={handlePayment}>
              Fizetés
            </button>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="notification">
          Kérjük, töltse ki az összes mezőt!
          <div className="progress-bar"></div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
