import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const productsPerPage = 20;
  const maxPageButtons = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/ora/oralekerdezes")
      .then((response) => {
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      })
      .catch(() => {
        console.error("Hiba történt a termékek lekérésekor.");
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

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
              <p className="product-price">Ár: {product.ar} Ft</p>
              <p className="product-stock">Raktáron: {product.raktar}</p>
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

        {/* Lapozás */}
        <div className="pagination">
          <button className="double-arrow" onClick={() => handlePageChange(1)}>&laquo;</button>
          <button className="arrow" onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>&lt;</button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              className={`page-button ${currentPage === startPage + index ? "active" : ""}`}
              onClick={() => handlePageChange(startPage + index)}
            >
              {startPage + index}
            </button>
          ))}
          <button className="arrow" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>&gt;</button>
          <button className="double-arrow" onClick={() => handlePageChange(totalPages)}>&raquo;</button>
        </div>
      </div>
    </div>
  );
}

export default Products;