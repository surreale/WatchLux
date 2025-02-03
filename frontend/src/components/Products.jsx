import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]); // Látható órák
  const [error, setError] = useState("");
  const [loadCount, setLoadCount] = useState(10); // Kezdetben 10 óra
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/ora/oralekerdezes")
      .then((response) => {
        setProducts(response.data);
        setVisibleProducts(response.data.slice(0, 10)); // Kezdő 10 elem betöltése
      })
      .catch(() => {
        setError("Hiba történt a termékek lekérésekor.");
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleProducts]); // Figyelje a változásokat

  const loadMoreProducts = () => {
    if (visibleProducts.length < products.length) {
      const nextLoad = Math.min(loadCount + 10, products.length);
      setVisibleProducts(products.slice(0, nextLoad));
      setLoadCount(nextLoad);
    }
  };

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
          {visibleProducts.map((product) => (
            <div
              key={product.oraaz}
              className="product-card"
              onClick={() => navigate(`/product/${product.oraaz}`)}
            >
              <img
                src={`/images/${product.kep1}`}
                alt={product.megnevezes}
                className="product-image"
              />
              <h3 className="product-name">{product.megnevezes}</h3>
              <p className="product-price product-ar">Ár: {product.ar} Ft</p>
              <p className="product-stock raktar">Raktáron: {product.raktar}</p>
              <button
                className="view-button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/product/${product.oraaz}`);
                }}
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
