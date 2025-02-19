import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext(); // Kosár kontextus létrehozása

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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

  // 🔹 Termék hozzáadása a kosárhoz
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.oraaz === product.oraaz);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.oraaz === product.oraaz ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 🔹 Termék eltávolítása a kosárból
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.oraaz !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
