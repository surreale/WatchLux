import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import "./Notification.css";
const rawUserId = localStorage.getItem("userId");
const userId = !rawUserId || rawUserId === "null" ? null : parseInt(rawUserId);


const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.ar) * (Number(item.mennyiseg) || 1),
    0
  );

  const handleInputChange = (e, isBilling = false) => {
    const { name, value } = e.target;
    if (isBilling) {
      setBillingInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
      if (sameAsShipping) {
        setBillingInfo((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    if (checked) {
      setBillingInfo({ ...shippingInfo });
    }
  };

  const handleNextToPayment = () => {
    const allFields = sameAsShipping
      ? Object.values(shippingInfo)
      : [...Object.values(shippingInfo), ...Object.values(billingInfo)];

    if (allFields.some((value) => value.trim() === "")) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    setShowPaymentSection(true);
  };

  const handlePayment = async () => {
    if (!acceptedTerms) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/order/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // ez most már biztosan null lesz, ha nincs bejelentkezve
          cart,
          shipping: shippingInfo,
          billing: billingInfo,
          sameAsShipping,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Hiba a rendelés mentésekor.");
      }
  
      alert("✅ Sikeres rendelés! Köszönjük a vásárlást.");
      localStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      console.error("❌ Rendelés hiba:", error);
      alert("Hiba történt a rendelés leadásakor.");
    }
  };
  

  return (
    <div className="checkout-page">
      <h2 className="cl">Fizetés</h2>
      {cart.length === 0 ? (
        <p className="cl">A kosár üres.</p>
      ) : (
        <>
          <div className="checkout-content">
            <div className="checkout-cart-summary">
              <h3>Termékek összegzése</h3>
              {cart.map((item) => (
                <div key={item.oraaz} className="checkout-item">
                  <img
                    src={`/images/${item.kep1}`}
                    alt={item.megnevezes}
                    className="checkout-image"
                  />
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

            {!showPaymentSection && (
              <div className="checkout-shipping">
                <h3>Szállítási adatok</h3>
                <form className="shipping-form">
                  {["name", "email", "address", "city", "postalCode", "phone"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field === "postalCode"
                          ? "Irányítószám*"
                          : field === "phone"
                          ? "Telefonszám*"
                          : field.charAt(0).toUpperCase() + field.slice(1) + "*"
                      }
                      value={shippingInfo[field]}
                      onChange={handleInputChange}
                      required
                    />
                  ))}
                </form>

                <div className="billing-section">
                  <h3>Számlázási adatok</h3>
                  <label>
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={handleSameAsShippingChange}
                    />{" "}
                    Megegyezik a szállítási adatokkal
                  </label>
                  <form className="shipping-form">
                    {["name", "email", "address", "city", "postalCode", "phone"].map((field) => (
                      <input
                        key={field}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={
                          field === "postalCode"
                            ? "Irányítószám*"
                            : field === "phone"
                            ? "Telefonszám*"
                            : field.charAt(0).toUpperCase() + field.slice(1) + "*"
                        }
                        value={billingInfo[field]}
                        onChange={(e) => handleInputChange(e, true)}
                        disabled={sameAsShipping}
                        required
                      />
                    ))}
                  </form>
                </div>

                <button className="payment-button" onClick={handleNextToPayment}>
                  Tovább a fizetéshez
                </button>
                <button className="vissza" onClick={() => navigate("/cart")}>
                  Vissza
                </button>
              </div>
            )}
          </div>

          {showPaymentSection && (
            <div className="payment-container">
              <h3>Fizetési mód</h3>
              <p>Csak utánvétes fizetés lehetséges.</p>

              <div className="terms">
                <label>
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />{" "}
                  Elfogadom és megértettem az{" "}
                  <a href="/aszf" target="_blank" rel="noopener noreferrer">
                    Általános Szerződési Feltételeket
                  </a>
                </label>
              </div>

              <button
                className="payment-button"
                onClick={handlePayment}
                disabled={!acceptedTerms}
              >
                Rendelés leadása
              </button>

              <button className="vissza2" onClick={() => setShowPaymentSection(false)}>
                Vissza
              </button>
            </div>
          )}
        </>
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
