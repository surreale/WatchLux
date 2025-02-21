import React, { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      <h1 className="cl fav">Kedvencek</h1>
      {favorites.length === 0 ? (
        <p className="cl">Nincsenek kedvenc termékek.</p>
      ) : (
        <div className="favorite-items">
          {favorites.map((item) => (
            <div key={item.oraaz} className="favorite-item">
              <img src={`/images/${item.kep1}`} alt={item.megnevezes} className="favorite-image" />
              <div className="favorite-details">
                <h3>{item.megnevezes}</h3>
                <p>Ár: {item.ar} Ft</p>
                <button className="remove-favorite" onClick={() => addToFavorites(item)}>Eltávolítás</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="back" onClick={() => navigate("/products")}>Vissza</button>
      <br />
    </div>
  );
};

export default Favorites;