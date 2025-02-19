import React, { createContext, useState, useEffect } from "react";
import "./Notification.css";

export const CartContext = createContext(); // Kosár kontextus létrehozása

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]); // Több értesítés tárolása

  // 🔹 Betöltjük a kosarat a localStorage-ból, ha van elmentett adat
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // 🔹 Kosár mentése localStorage-ba
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 Termék hozzáadása vagy eltávolítása a kosárból
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.some((item) => item.oraaz === product.oraaz);
      if (exists) {
        addNotification(`${product.megnevezes} kivéve a kosárból`);
        return prevCart.filter((item) => item.oraaz !== product.oraaz);
      } else {
        addNotification(`${product.megnevezes} hozzáadva a kosárhoz`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 🔹 Új értesítés hozzáadása és automatikus törlése 3 másodperc után
  const addNotification = (message) => {
    const id = Date.now(); // Egyedi ID minden értesítéshez
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
      <div className="notification-container">
        {notifications.map((notif) => (
          <Notification key={notif.id} message={notif.message} />
        ))}
      </div>
    </CartContext.Provider>
  );
};

// 🔹 Több értesítést támogató komponens
const Notification = ({ message }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <div className="progress-bar"></div>
    </div>
  );
};
