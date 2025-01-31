import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Betöltött id:', id); // Ellenőrzésre az id értéke
    axios
      .get(`http://localhost:8080/ora/oralekerdezes/${id}`)
      .then((response) => {
        console.log('API válasz:', response.data); // Ellenőrizd, hogy mit küld vissza az API
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Hiba történt az adatlekérés során:', error);
      });
  }, [id]);  

  if (!product) {
    return <div>Adatok betöltése...</div>;
  }

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>Vissza</button>
      <h2 className="product-title">{product.megnevezes}</h2>
      <img src={`/images/${product.kep1}`} alt={product.megnevezes} className="product-image" />
      <p className="product-description">{product.leiras}</p>
      <p className="product-price">Ár: {product.ar} Ft</p>
      <p className="product-stock">Raktár: {product.raktar}</p>
    </div>
  );
}

export default ProductDetails;
