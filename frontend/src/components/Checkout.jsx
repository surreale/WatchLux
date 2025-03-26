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
    taxId: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.ar) * (Number(item.mennyiseg) || 1),
    0
  );

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").replace(/^36/, "");
    return "36" + digits.slice(0, 9);
  };

  const formatName = (value) => {
    let cleaned = value.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s-]/g, "");
    cleaned = cleaned
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, (char) => char.toUpperCase())
      .slice(0, 40);
    return cleaned;
  };

  const isValidEmail = (email) =>
    email.length <= 40 && (email.match(/@/g) || []).length === 1;

  const formatTaxId = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let formatted = "";

    if (digits.length > 0) formatted += digits.slice(0, 8);
    if (digits.length > 8) formatted += "-" + digits.slice(8, 9);
    if (digits.length > 9) formatted += "-" + digits.slice(9, 11);

    return formatted;
  };

  const handleInputChange = (e, isBilling = false) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "taxId") {
      newValue = formatTaxId(value);
    } else if (name === "phone") {
      newValue = formatPhone(value);
    } else if (name === "name") {
      newValue = formatName(value);
    } else if (name === "email" && value.length > 40) {
      return;
    } else if (name === "postalCode") {
      newValue = value.replace(/\D/g, "").slice(0, 15); // 💥 Itt a lényeg!
    } else if (name === "city") {
      newValue = value.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s\-]/g, "");
    }
    
    
    


    if (isBilling) {
      setBillingInfo((prev) => ({ ...prev, [name]: newValue }));
    } else {
      setShippingInfo((prev) => ({ ...prev, [name]: newValue }));
      if (sameAsShipping) {
        setBillingInfo((prev) => ({ ...prev, [name]: newValue }));
      }
    }
  };

  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    if (checked) {
      setBillingInfo({ ...shippingInfo, taxId: "" });
    }
  };

  const handleNextToPayment = () => {
    const phoneValid = /^36\d{9}$/.test(billingInfo.phone);
    const nameValid = billingInfo.name.includes(" ") && billingInfo.name.length <= 40;
    const emailValid = isValidEmail(billingInfo.email);

    if (!phoneValid || !nameValid || !emailValid) {
      alert("⚠️ Hibás név, telefonszám vagy email.");
      return;
    }

    const allFields = sameAsShipping
      ? Object.values(shippingInfo)
      : Object.entries(billingInfo)
          .filter(([key]) => key !== "taxId")
          .map(([, val]) => val);

    if (allFields.some((val) => val.trim() === "")) {
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

    const taxIdRegex = /^\d{8}-\d{1}-\d{2}$/;
    if (billingInfo.taxId && !taxIdRegex.test(billingInfo.taxId)) {
      alert("❌ Hibás adószám formátum! Használj ilyen formátumot: 12345678-1-12");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/order/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cart,
          shipping: shippingInfo,
          billing: billingInfo,
          sameAsShipping,
        }),
      });

      if (!response.ok) throw new Error("Hiba a rendelés mentésekor.");

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
  <input
    name="name"
    placeholder="Teljes név*"
    value={shippingInfo.name}
    onChange={handleInputChange}
    required
  />
  <input
    name="email"
    placeholder="Email cím*"
    value={shippingInfo.email}
    onChange={handleInputChange}
    required
  />
  <input
    name="address"
    placeholder="Cím*"
    value={shippingInfo.address}
    onChange={handleInputChange}
    required
  />
  <input
    name="city"
    placeholder="Város*"
    value={shippingInfo.city}
    onChange={handleInputChange}
    required
  />
  <input
    name="postalCode"
    placeholder="Irányítószám*"
    value={shippingInfo.postalCode}
    onChange={handleInputChange}
    required
  />
  <input
    name="phone"
    placeholder="Telefonszám*"
    value={shippingInfo.phone}
    onChange={handleInputChange}
    required
  />
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
  <input
    name="name"
    placeholder="Teljes név*"
    value={billingInfo.name}
    onChange={(e) => handleInputChange(e, true)}
    disabled={sameAsShipping}
    required
  />
  <input
    name="email"
    placeholder="Email cím*"
    value={billingInfo.email}
    onChange={(e) => handleInputChange(e, true)}
    disabled={sameAsShipping}
    required
  />
  <input
    name="address"
    placeholder="Cím*"
    value={billingInfo.address}
    onChange={(e) => handleInputChange(e, true)}
    disabled={sameAsShipping}
    required
  />
  <input
    name="city"
    placeholder="Város*"
    value={billingInfo.city}
    onChange={(e) => handleInputChange(e, true)}
    disabled={sameAsShipping}
    required
  />
  <input
    name="postalCode"
    placeholder="Irányítószám*"
    value={billingInfo.postalCode}
    onChange={(e) => handleInputChange(e, true)}
    disabled={sameAsShipping}
    required
  />
  <input
    name="phone"
    placeholder="Telefonszám*"
    value={billingInfo.phone}
    onChange={(e) => handleInputChange(e, true)}
    disabled={sameAsShipping}
    required
  />
  <input
    name="taxId"
    placeholder="Adószám (opcionális)"
    value={billingInfo.taxId}
    onChange={(e) => handleInputChange(e, true)}
  />
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
                  Elfogadom az{" "}
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
          Kérjük, töltsd ki az összes mezőt!
          <div className="progress-bar"></div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
