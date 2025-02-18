import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "./Filter"; // 🔹 Szűrő importálása
import "./Products.css";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({}); // 🔹 Aktív szűrők

  const productsPerPage = 20;
  const maxPageButtons = 5;

  // **1. Oldalszám beállítása az URL alapján**
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // **2. Alap terméklista lekérése**
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

  // **3. Szűrők alkalmazása**
  const applyFilters = async (filters) => {
    setActiveFilters(filters); // 🔹 Mentjük az aktív szűrőket
    console.log("🔍 Aktív szűrők:", filters); // ✅ Debugging log

    try {
      const response = await axios.get("http://localhost:8080/ora/filtered2", {
        params: filters,
      });

      console.log("✅ Szűrt termékek a backendből:", response.data); // ✅ Debugging log

      setFilteredProducts(response.data); // 🔹 A szűrt termékek beállítása
      setTotalPages(Math.ceil(response.data.length / productsPerPage));
    } catch (error) {
      console.error("❌ Hiba történt a szűrt termékek lekérésekor:", error);
    }
  };

  // **4. Oldalváltás frissítése az URL-ben**
  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
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
      {filterVisible && <Filter setFilteredProducts={applyFilters} />}

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
                <button
                  className="view-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/product/${product.oraaz}?page=${currentPage}`);
                  }}
                >
                  Megtekintés
                </button>
              </div>
            ))
          ) : (
            <p className="no-products">❌ Nincs találat a kiválasztott szűrési feltételekre.</p>
          )}
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
