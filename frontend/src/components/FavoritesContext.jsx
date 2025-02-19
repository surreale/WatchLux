import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext(); // 🔹 Kedvencek kontextus létrehozása

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 🔹 Betöltjük a kedvenceket a localStorage-ból, ha van elmentett adat
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // 🔹 Kedvencek mentése localStorage-ba
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🔹 Termék hozzáadása a kedvencekhez
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.oraaz === product.oraaz);
      if (!exists) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  // 🔹 Termék eltávolítása a kedvencekből
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.oraaz !== productId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
