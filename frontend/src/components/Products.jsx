import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Filter from "./Filter"; // Az új szűrő importálása
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  const navigate = useNavigate();

  const productsPerPage = 20;
  const maxPageButtons = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/ora/oralekerdezes")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
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
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="products-page">
      {/* Alternatív navbar szűrő gombbal */}
      <div className="filter-navbar">
        <button className="filter-toggle-button" onClick={() => setFilterVisible(!filterVisible)}>
          {filterVisible ? "Szűrő összecsukása" : "Szűrő megjelenítése"}
        </button>
      </div>

      {/* Szűrő megjelenítése feltételesen */}
      {filterVisible && <Filter setFilteredProducts={setFilteredProducts} />}

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
          {Array.from({ length: maxPageButtons }, (_, index) => {
            const pageNumber = Math.max(1, currentPage - Math.floor(maxPageButtons / 2)) + index;
            return pageNumber <= totalPages ? (
              <button
                key={pageNumber}
                className={`page-button ${currentPage === pageNumber ? "active" : ""}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ) : null;
          })}
          <button className="arrow" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>&gt;</button>
          <button className="double-arrow" onClick={() => handlePageChange(totalPages)}>&raquo;</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
