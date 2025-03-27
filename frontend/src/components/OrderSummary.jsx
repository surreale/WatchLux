import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoiceId, savedShipping, orderCart, totalPrice } = location.state || {};

  if (!invoiceId || !savedShipping || !orderCart) {
    return <p className="cl">Hiba: hiányzó rendelési adatok.</p>;
  }

  return (
    <div className="checkout-page">
      <h2 className="cl">✅ Sikeres megrendelés!</h2>
      <div className="checkout-content">
        <div className="checkout-cart-summary">
          <p><strong>Számla azonosító:</strong> {invoiceId}</p>
          <p><strong>Név:</strong> {savedShipping.name}</p>
          <p><strong>Email:</strong> {savedShipping.email}</p>
          <p><strong>Telefonszám:</strong> {savedShipping.phone}</p>
          <p><strong>Cím:</strong> {savedShipping.address}</p>
          <p><strong>Város:</strong> {savedShipping.city}</p>
          <p><strong>Irányítószám:</strong> {savedShipping.postalCode}</p>
          {savedShipping.taxId && (
            <p><strong>Adószám:</strong> {savedShipping.taxId}</p>
          )}

          <h4>Megrendelt termékek:</h4>
          <ul>
            {orderCart.map((item) => (
              <li key={item.oraaz}>
                {item.megnevezes} – {item.mennyiseg || 1} db – {Number(item.ar).toLocaleString()} Ft
              </li>
            ))}
          </ul>

          <h4>Végösszeg: {Number(totalPrice).toLocaleString()} Ft</h4>

          <button className="payment-button">Számla letöltése (hamarosan)</button>
          <button className="vissza2" onClick={() => navigate("/")}>Vissza a főoldalra</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
