import React, { createContext, useState, useEffect } from "react";
import "./Notification.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]); // Több értesítés tárolása

  // Betöltjük a kosarat a localStorage-ból, ha van elmentett adat
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      localStorage.removeItem("cartBackup");
    }
}, []);


  // Kosár mentése localStorage-ba
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  // Termék hozzáadása a kosárhoz
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.oraaz === product.oraaz);
      if (existingItem) {
        // Ha már létezik a termék, csak a mennyiséget növeli
        addNotification("Termék mennyisége frissítve a kosárban!");
        return prevCart.map((item) =>
          item.oraaz === product.oraaz
            ? { ...item, mennyiseg: (item.mennyiseg || 1) + (product.mennyiseg || 1) }
            : item
        );
      } else {
        // Ha új termék, hozzáadja a kosárhoz alapértelmezett mennyiséggel
        addNotification("Termék hozzáadva a kosárhoz!");
        return [...prevCart, { ...product, mennyiseg: product.mennyiseg || 1 }];
      }
    });
  };

  // Termék eltávolítása a kosárból
  const removeFromCart = (oraaz) => {
    setCart((prevCart) => prevCart.filter((item) => item.oraaz !== oraaz));
    addNotification("Termék eltávolítva a kosárból");
  };

  // Mennyiség módosítása a kosárban
  const updateCartQuantity = (oraaz, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.oraaz === oraaz ? { ...item, mennyiseg: newQuantity } : item
      )
    );
    addNotification("Termék mennyisége frissítve!");
  };

  // Új értesítés hozzáadása és automatikus törlése 3 másodperc után
  const addNotification = (message) => {
    const id = Date.now(); // Egyedi ID minden értesítéshez
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
      <div className="notification-container">
        {notifications.map((notif) => (
          <Notification key={notif.id} message={notif.message} />
        ))}
      </div>
    </CartContext.Provider>
  );
};

// Több értesítést támogató komponens
const Notification = ({ message }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <div className="progress-bar"></div>
    </div>
  );
};
