import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./Products.css";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredProducts, setFilteredProducts] = useState([]);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  
  const productsPerPage = 20;
  const maxPageButtons = 5;

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/oralekerdezes")
      .then((response) => {
        setFilteredProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      })
      .catch(() => {
        console.error("❌ Hiba történt a termékek betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a márkák betöltésekor.");
      });
  }, []);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
  
    if (brand === "") {
      axios.get("http://localhost:8080/ora/oralekerdezes")
        .then((response) => {
          setFilteredProducts(response.data);
          setTotalPages(Math.ceil(response.data.length / productsPerPage));
          setCurrentPage(1);
        })
        .catch(() => {
          console.error("❌ Hiba történt az összes termék betöltésekor.");
        });
    } else {
      axios.get("http://localhost:8080/ora/filtered", {
        params: { marka: brand }
      })
      .then((response) => {
        setFilteredProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
        setCurrentPage(1);
      })
      .catch(() => {
        console.error("❌ Hiba történt a szűrés során.");
      });
    }
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="products-page">
      <h2 className="products-title">Termékek szűrése</h2>
      
      <div className="filter-navbar">
        <button className="filter-toggle-button" onClick={() => setFilterVisible(!filterVisible)}>
          {filterVisible ? "Szűrő összecsukása" : "Szűrő megjelenítése"}
        </button>
      </div>

      {filterVisible && (
        <div className="filters-container">
          <h3>Szűrés</h3>
          <label htmlFor="brand-filter">Márka:</label>
          <div className="dropdown-container">
  <select id="brand-filter" className="brand-dropdown" value={selectedBrand} onChange={handleBrandChange}>
    <option value="">Válassz márkát</option>
    {brands.map((brand) => (
      <option key={brand.markaaz} value={brand.marka}>{brand.marka}</option>
    ))}
  </select>
</div>

        </div>
      )}

      <div className="products-container">
        <h2 className="products-title">Termékek</h2>
        <div className="products-grid">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <div
                key={product.oraaz}
                className="product-card"
                onClick={() => navigate(`/product/${product.oraaz}?page=${currentPage}`)}
              >
                <img
                  src={`/images/${product.kep1}`}
                  alt={product.megnevezes}
                  className="product-image"
                />
                <h3 className="product-name">{product.megnevezes}</h3>
                <p className="product-price product-ar">Ár: {product.ar} Ft</p>
                <p className="product-stock">Raktáron: {product.raktar}</p>
              </div>
            ))
          ) : (
            <p className="no-products">❌ Nincs találat a kiválasztott szűrési feltételekre.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button className="double-arrow" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&laquo;</button>
            <button className="arrow" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>&lt;</button>
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
            <button className="arrow" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>&gt;</button>
            <button className="double-arrow" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
