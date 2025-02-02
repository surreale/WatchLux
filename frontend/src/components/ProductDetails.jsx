import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();

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

  if (loading) {
    return <div className="loading">Betöltés...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleImageClick = (image) => {
    setMainImage(`/images/${image}`);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Vissza
      </button>

      <div className="product-details">
        {/* Bal oldali kép szekció */}
        <div className="image-section">
          <img 
            src={mainImage} 
            alt={product.megnevezes} 
            className={`main-image ${isZoomed ? 'zoomed' : ''}`} 
            onClick={toggleZoom}
          />
          <div className="thumbnail-section">
            {[product.kep1, product.kep2, product.kep3].map((image, index) => (
              <img
                key={index}
                src={`/images/${image}`}
                alt={`${product.megnevezes} ${index + 1}`}
                className="thumbnail-image"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Jobb oldali információk */}
        <div className="info-section">
          <h1 className="product-title">{product.megnevezes}</h1>
          <p className="product-brand">{product.marka}</p>
          <p className="product-price">{product.ar.toLocaleString()} Ft</p>
          <p className="product-stock">Raktáron: {product.raktar}</p>

          {/* Vásárlás és kedvencek gomb */}
          <div className="buttons">
            <button className="buy-button">🛒 Kosárba</button>
            <button className="wishlist-button">🤍 Kedvencekhez</button>
          </div>

          {/* Részletes termék adatok */}
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
