import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/ora/oralekerdezes')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError('Hiba történt a termékek lekérésekor.');
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-page">
      <aside className="filters">
        <h3>Szűrés</h3>
        <label>Árkategória:</label>
        <Slider range min={10000} max={150000} defaultValue={[10000, 150000]} />
        <label>Márka:</label>
        <input type="text" name="brand" />
        <label>Modell:</label>
        <input type="text" name="model" />
        <label>Óratípus:</label>
        <input type="text" name="type" />
      </aside>

      <div className="products-container">
        <h2 className="products-title">Termékek</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.oraaz} className="product-card">
              <img
                src={`/images/${product.kep1}`}
                alt={product.megnevezes}
                className="product-image"
              />
              <h3 className="product-name">{product.megnevezes}</h3>
              <p className="product-price">Ár: {product.ar} Ft</p>
              <p className="product-stock">Raktáron: {product.raktar}</p>
              <button
                className="view-button"
                onClick={() => navigate(`/product/${product.oraaz}`)}
              >
                Megtekintés
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
