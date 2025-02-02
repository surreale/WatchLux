import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/ora/oralekerdezes/${id}`)
      .then((response) => {
        setProduct(response.data);
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

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        Vissza
      </button>
      <div className="details-card">
        <img
          src={`/images/${product.kep1}`}
          alt={product.megnevezes}
          className="product-image"
        />
        <h1>{product.megnevezes}</h1>
        <p className="product-price">Ár: {product.ar} Ft</p>
        <p className="product-stock">Raktáron: {product.raktar}</p>
        <p className="product-brand">Márka: {product.marka}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
