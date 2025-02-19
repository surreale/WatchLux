import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "./Filter"; 
import "./Products.css";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 TERMÉKLISTÁK (Eredeti + Szűrt lista)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false); // 🔥 Új állapotváltozó a frissítéshez
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  
  const productsPerPage = 20;
  const maxPageButtons = 5;

  // ✅ **1️⃣ OLDALSZÁM FRISSÍTÉSE**
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // ✅ **2️⃣ TERMÉKEK BETÖLTÉSE**
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

  // ✅ **3️⃣ SZŰRÉS MEGOLDÁSA**
  const applyFilters = async (filters) => {
    console.log("🔍 Aktív szűrők:", filters);

    try {
        const response = await axios.get("http://localhost:8080/ora/filtered2", {
            params: filters,
        });

        console.log("✅ SZŰRT ADATOK A BACKENDTŐL:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
            setFilteredProducts(response.data); // 🔥 Frissítés
            setTotalPages(Math.ceil(response.data.length / productsPerPage));
            setCurrentPage(1); // 🔹 Szűrés után az 1. oldalra ugrunk
            setForceUpdate(prev => !prev); // 🔥 Kikényszerítjük a frissítést!
        } else {
            console.warn("⚠️ Üres lista érkezett, nincs találat!");
            setFilteredProducts([]);
            setForceUpdate(prev => !prev);
        }
    } catch (error) {
        console.error("❌ Hiba történt a szűrés során:", error);
    }
};


  // ✅ **4️⃣ OLDALVÁLTÁS**
  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    setCurrentPage(page);
  };

  // ✅ **5️⃣ KIJAVÍTOTT MEGJELENÍTÉS – VÉGRE A SZŰRT ADATOKAT MUTATJA**
  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="products-page">
      {/* SZŰRŐ GOMB */}
      <div className="filter-navbar">
        <button className="filter-toggle-button" onClick={() => setFilterVisible(!filterVisible)}>
          {filterVisible ? "Szűrő összecsukása" : "Szűrő megjelenítése"}
        </button>
      </div>

      {filterVisible && <Filter setFilteredProducts={applyFilters} />} 

      {/* TERMÉKEK LISTÁJA */}
      <div className="products-container">
        <h2 className="products-title">Termékek</h2>
        <div className="products-grid" key={forceUpdate ? "update-yes" : "update-no"}>

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

        {/* 🔹 LAPOZÁS */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="double-arrow" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              &laquo;
            </button>
            <button className="arrow" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
              &lt;
            </button>

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

            <button className="arrow" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
              &gt;
            </button>
            <button className="double-arrow" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
