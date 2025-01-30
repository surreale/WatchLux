import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // CSS importálása

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Aktuális oldal
  const itemsPerPage = 25; // Termékek száma oldalanként
  const pagesToShow = 3; // Egyszerre megjelenő oldalszámok száma

  useEffect(() => {
    axios
      .get('http://localhost:8080/ora/oralekerdezes') // Backend API hívása
      .then((response) => {
        setProducts(response.data); // Adatok állapotba mentése
        setLoading(false);
      })
      .catch((error) => {
        console.error('Hiba történt az adatok lekérésekor:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Adatok betöltése...</div>;
  }

  // Lapozáshoz szükséges adatok
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Aktív oldalszámok kiszámítása
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Termékek</h2>
      <div className="products-grid">
        {currentItems.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={`/images/${product.kep1}`} // Kép URL-je
              alt={product.megnevezes}
              className="product-image"
            />
            <h3 className="product-name">{product.megnevezes}</h3>
            <p className="product-price">Ár: {product.ar} Ft</p>
            <p className="product-stock">Raktár: {product.raktar}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handleFirst} disabled={currentPage === 1} className="arrow">
          ⏮
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 1} className="arrow">
          ◀
        </button>
        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages} className="arrow">
          ▶
        </button>
        <button onClick={handleLast} disabled={currentPage === totalPages} className="arrow">
          ⏭
        </button>
      </div>
    </div>
  );
}

export default Products;
