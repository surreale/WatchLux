import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { FavoritesContext } from "./FavoritesContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart  } = useContext(CartContext);
  const { favorites, addToFavorites } = useContext(FavoritesContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1); 

  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/ora/oralekerdezes/${id}`)
      .then((response) => {
        setProduct(response.data);
        setMainImage(`/images/${response.data.kep1}`);
        setLoading(false);
      })
      .catch(() => {
        setError('Hiba történt a termék adatainak lekérésekor.');
        setLoading(false);
      });
  }, [id]);

    
    const handleQuantityChange = (value) => {
      if (value >= 1 && value <= 20) {
        setQuantity(value);
      }
    };


const handleAddToCart = () => {
  if (!product) return;

  if (cart.some((item) => item.oraaz === product.oraaz)) {
    removeFromCart(product.oraaz);  
  } else {
    addToCart({
      oraaz: product.oraaz,
      megnevezes: product.megnevezes,
      ar: product.ar,
      kep1: product.kep1,
      mennyiseg: quantity
    });
  }
};


 
  const isFavorite = product ? favorites.some((item) => item.oraaz === product.oraaz) : false;
  const handleToggleFavorite = () => {
    if (!product) return;

    addToFavorites({
      oraaz: product.oraaz,
      megnevezes: product.megnevezes,
      ar: product.ar,
      kep1: product.kep1
    });
  };

  if (loading) return <div className="loading">Betöltés...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>Vissza</button>

      <div className="product-details">
        <div className="image-section">
          <img 
            src={mainImage} 
            alt={product.megnevezes} 
            className={`main-image ${isZoomed ? 'zoomed' : ''}`} 
            onClick={() => setIsZoomed(!isZoomed)}
          />
          <div className="thumbnail-section">
            {[product.kep1, product.kep2, product.kep3].map((image, index) => (
              image && (
                <img
                  key={index}
                  src={`/images/${image}`}
                  alt={`${product.megnevezes} ${index + 1}`}
                  className="thumbnail-image"
                  onClick={() => setMainImage(`/images/${image}`)}
                />
              )
            ))}
          </div>
        </div>

        <div className="info-section">
          <h1 className="product-title">{product.megnevezes}</h1>
          <p className="product-brand">{product.marka}</p>
          <p className="product-price"> Ár: {Number(product.ar).toLocaleString('hu-HU')} Ft</p>
          <p className="product-stock">Raktáron: {product.raktar}</p>

                    <div className="quantity-selector-small">
            <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
            <input 
              type="text" 
              value={quantity} 
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} 
            />
            <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= 20}>+</button>
          </div>

          <div className="buttons">
            <button className="buy-button" onClick={handleAddToCart}>
              {cart.some((item) => item.oraaz === product.oraaz) ? "Kivétel a kosárból" : "Kosárba"}
            </button>

            <button 
              className={`wishlist-button ${isFavorite ? "favorited" : ""}`} 
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "❤️ Kedvencekből eltávolítás" : "🤍 Kedvencekhez"}
            </button>
          </div>

          <div className="product-info">
            <h2>Termék részletei</h2>
            <div className="info-grid">
              <div>
                <p><strong>Márka:</strong> {product.marka}</p>
                <p><strong>Cikkszám:</strong> {product.cikszam}</p>
                <p><strong>Nem:</strong> {product.nem}</p>
                <p><strong>Meghajtás:</strong> {product.meghajtas}</p>
                <p><strong>Vízállóság:</strong> {product.vizallosag}</p>
                <p><strong>Jótállás:</strong> {product.jotallas}</p>
              </div>
              <div>
                <p><strong>Méret (mm):</strong> {product.meretmillimeterben}</p>
                <p><strong>Súly (g):</strong> {product.sulygrammban}</p>
                <p><strong>Típus:</strong> {product.tipus}</p>
                <p><strong>Dátumkijelzés:</strong> {product.datumkijelzes}</p>
                <p><strong>Extrafunkciók:</strong> {product.extrafunkcio}</p>
              </div>
              <div>
                <p><strong>Tok színe:</strong> {product.atokszine}</p>
                <p><strong>Számlap színe:</strong> {product.aszamlapszine}</p>
                <p><strong>Tok anyaga:</strong> {product.atok}</p>
                <p><strong>Üveg típusa:</strong> {product.kristalyuveg}</p>
                <p><strong>Számlap típusa:</strong> {product.szamlaptipus}</p>
              </div>
              <div>
                <p><strong>Óra formája:</strong> {product.oraforma}</p>
                <p><strong>Szíj színe:</strong> {product.szijszine}</p>
                <p><strong>Szíj anyaga:</strong> {product.szij}</p>
                <p><strong>Max csukló méret (mm):</strong> {product.maxcsuklomili}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
