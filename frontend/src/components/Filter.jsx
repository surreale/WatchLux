import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css"; // Stílusfájl

const Filter = ({ setFilteredProducts }) => {
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({ marka: [] });

  // **1️⃣ Adatok lekérése az API-ból**
  useEffect(() => {
    const fetchMarkak = async () => {
      try {
        const response = await axios.get("http://localhost:8080/filters/markak");
        console.log("✅ Márkák API válasz:", response.data);
        setOptions((prev) => ({ ...prev, marka: response.data }));
      } catch (error) {
        console.error("❌ Hiba a márkák betöltésekor:", error);
      }
    };
    fetchMarkak();
  }, []);

  // **2️⃣ Szűrési feltételek kezelése**
  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(`✅ Kiválasztott ${name}: ${value}`);

    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    try {
      const response = await axios.get("http://localhost:8080/ora/filtered2", {
        params: updatedFilters,
      });

      console.log("✅ Szűrt termékek a backendből:", response.data);
      setFilteredProducts(response.data); // 🔹 A szűrt termékek beállítása
    } catch (error) {
      console.error("❌ Hiba a szűrt termékek lekérésekor:", error);
    }
  };

  return (
    <div className="filter-container">
      <h2>🔍 Termék Szűrés</h2>
      <div className="filter-form">
        <div className="filter-group">
          <label htmlFor="marka">Márka</label>
          <select id="marka" name="marka" onChange={handleChange}>
            <option value="">-- Válassz márkát --</option>
            {options.marka.length > 0 ? (
              options.marka.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))
            ) : (
              <option value="" disabled>Nincs elérhető adat</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
