import React, { createContext, useState, useEffect } from "react";
import "./Notification.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  
 
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart && JSON.parse(savedCart).length > 0) {
      setCart(JSON.parse(savedCart));
    } else {
      const backupCart = localStorage.getItem("cartBackup");
      if (backupCart) {
        setCart(JSON.parse(backupCart));
      }
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.oraaz === product.oraaz);
      if (existingItem) {
        
        addNotification("Termék mennyisége frissítve a kosárban!");
        return prevCart.map((item) =>
          item.oraaz === product.oraaz
            ? { ...item, mennyiseg: (item.mennyiseg || 1) + (product.mennyiseg || 1) }
            : item
        );
      } else {
        
        addNotification("Termék hozzáadva a kosárhoz!");
        return [...prevCart, { ...product, mennyiseg: product.mennyiseg || 1 }];
      }
    });
  };

  
  const removeFromCart = (oraaz) => {
    setCart((prevCart) => prevCart.filter((item) => item.oraaz !== oraaz));
    addNotification("Termék eltávolítva a kosárból");
  };

  
  const updateCartQuantity = (oraaz, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.oraaz === oraaz ? { ...item, mennyiseg: newQuantity } : item
      )
    );
    addNotification("Termék mennyisége frissítve!");
  };

  
  const addNotification = (message) => {
    const id = Date.now(); 
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>

      {children}
      <div className="notification-container">
        {notifications.map((notif) => (
          <Notification key={notif.id} message={notif.message} />
        ))}
      </div>
    </CartContext.Provider>
  );
};



const Notification = ({ message }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <div className="progress-bar"></div>
    </div>
  );
};
