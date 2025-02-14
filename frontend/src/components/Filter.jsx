import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css"; // Stílus az egységes megjelenéshez

const Filter = () => {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState({
    marka: [],
    tipus: [],
    szijszine: [],
    aszamlapszine: [],
    atok: [],
    atokszine: [],
    kristalyuveg: [],
    oraforma: [],
    szij: [],
    maxcsuklomili: [],
    datumkijelzes: [],
    vizallosag: [],
    nem: [],
    sulygrammban: [],
    extrafunkcio: [],
    raktar: [],
    ar: [],
    meghajtas: []
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/adatok/filtered2");
        const data = response.data;
        
        const uniqueValues = (key) => [...new Set(data.map(item => item[key]))];
        setOptions({
          marka: uniqueValues("marka"),
          tipus: uniqueValues("tipus"),
          szijszine: uniqueValues("szijszine"),
          aszamlapszine: uniqueValues("aszamlapszine"),
          atok: uniqueValues("atok"),
          atokszine: uniqueValues("atokszine"),
          kristalyuveg: uniqueValues("kristalyuveg"),
          oraforma: uniqueValues("oraforma"),
          szij: uniqueValues("szij"),
          maxcsuklomili: uniqueValues("maxcsuklomili"),
          datumkijelzes: uniqueValues("datumkijelzes"),
          vizallosag: uniqueValues("vizallosag"),
          nem: uniqueValues("nem"),
          sulygrammban: uniqueValues("sulygrammban"),
          extrafunkcio: uniqueValues("extrafunkcio"),
          raktar: uniqueValues("raktar"),
          ar: uniqueValues("ar"),
          meghajtas: uniqueValues("meghajtas")
        });
      } catch (error) {
        console.error("Hiba a szűrő opciók betöltésekor:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/adatok/filtered2", {
        params: filters,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Hiba történt a termékek lekérésekor:", error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  return (
    <div className="filter-container">
      <h2>Termék Szűrés</h2>
      <div className="filter-form">
        {Object.keys(options).map((key) => (
          <select key={key} name={key} onChange={handleChange}>
            <option value="">Válassz {key}</option>
            {options[key].map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))}
          </select>
        ))}
        <button onClick={fetchFilteredProducts}>Szűrés</button>
      </div>
      
      <h3>Talált termékek</h3>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.oraaz} className="product-item">
              <h4>{product.nev}</h4>
              <p><strong>Márka:</strong> {product.marka}</p>
              <p><strong>Ár:</strong> {product.ar} Ft</p>
              <p><strong>Típus:</strong> {product.tipus}</p>
            </div>
          ))
        ) : (
          <p>Nincs találat.</p>
        )}
      </div>
    </div>
  );
};

export default Filter;
