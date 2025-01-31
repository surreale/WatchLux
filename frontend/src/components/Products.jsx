import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 10000,
    maxPrice: 150000,
    brand: '',
    model: '',
    type: '',
  });
  const itemsPerPage = 25;
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [filters]);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadProducts = () => {
    if (!hasMore) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/ora/oralekerdezes`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          brand: filters.brand,
          model: filters.model,
          type: filters.type,
        },
      })
      .then((response) => {
        if (response.data.length < itemsPerPage) {
          setHasMore(false);
        }
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Hiba történt az adatok lekérésekor:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadBrands = () => {
    axios
      .get(`http://localhost:8080/ora/markalekerdezes`)
      .then((response) => {
        const uniqueBrands = response.data.map((brand) => ({
          markaaz: brand.markaaz,
          marka: brand.marka,
        }));
        setBrands(uniqueBrands);
      })
      .catch((error) => {
        console.error('Hiba történt a márkák lekérésekor:', error);
      });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="products-page">
      <aside className="filters">
        <h3>Szűrés</h3>
        <label>Árkategória:</label>
        <Slider
          range
          min={10000}
          max={150000}
          value={[filters.minPrice, filters.maxPrice]}
          onChange={(value) => setFilters({ ...filters, minPrice: value[0], maxPrice: value[1] })}
        />
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            min="10000"
          />
          <span>-</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            max="150000"
          />
        </div>
        <label>Márka:</label>
        <select name="brand" value={filters.brand} onChange={handleFilterChange}>
          <option value="">Összes</option>
          {brands.map((brand) => (
            <option key={brand.markaaz} value={brand.marka}>
              {brand.marka}
            </option>
          ))}
        </select>
      </aside>
      <div className="products-container">
        <h2 className="products-title">Termékek</h2>
        <div className="products-grid">
          {products.map((product) => (
            <LazyLoadProduct key={product.id} product={product} navigate={navigate} />
          ))}
        </div>

        {loading && <div className="loading">Betöltés...</div>}
      </div>
    </div>
  );
}

function LazyLoadProduct({ product, navigate }) {
  return (
    <div className="product-card">
      <img src={`/images/${product.kep1}`} alt={product.megnevezes} className="product-image" />
      <h3 className="product-name">{product.megnevezes}</h3>
      <p className="product-price">Ár: {product.ar} Ft</p>
      <p className="product-stock">Raktár: {product.raktar}</p>
      <button className="view-button" onClick={() => navigate(`/product/${product.id}`)}>Megtekintés</button>
    </div>
  );
}

export default Products;
