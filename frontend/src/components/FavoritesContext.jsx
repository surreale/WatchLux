import React, { createContext, useState, useEffect } from "react";
import "./Notification.css";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]); 

  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

 
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.oraaz === product.oraaz);
      if (exists) {
        addNotification("Termék eltávolítva a kedvencekből");
        return prevFavorites.filter((item) => item.oraaz !== product.oraaz);
      } else {
        addNotification("Termék hozzáadva a kedvencekhez");
        return [...prevFavorites, product];
      }
    });
  };


  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
      <div className="notification-container">
        {notifications.map((notif) => (
          <Notification key={notif.id} message={notif.message} />
        ))}
      </div>
    </FavoritesContext.Provider>
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

