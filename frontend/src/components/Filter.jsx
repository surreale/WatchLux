import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css";

const Filter = ({ setFilteredProducts }) => {
  const [filters, setFilters] = useState({ marka: "" });
  const [options, setOptions] = useState({ marka: [] });

  // 🔹 1️⃣ Márkák lekérése
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

  // 🔹 2️⃣ Szűrés küldése POST metódussal
  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(`✅ Kiválasztott ${name}: ${value}`);

    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    console.log("🔴 Küldeni akarom a kérést a backendnek POST metódussal!");
    console.log("📡 Küldött adatok:", updatedFilters);

    try {
      const response = await axios.post("http://localhost:8080/ora/filtered2", updatedFilters, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("✅ Backend válasza:", response.data);

      if (Array.isArray(response.data)) {
        setFilteredProducts(response.data);
      } else {
        console.error("❌ HIBA: A backend nem tömböt küldött!", response.data);
      }
    } catch (error) {
      console.error("❌ Hiba történt a szűrt adatok lekérésekor:", error);
    }
  };

  return (
    <div className="filter-container">
      <h2>🔍 Termék Szűrés</h2>
      <div className="filter-form">
        <div className="filter-group">
          <label htmlFor="marka">Márka</label>
          <select id="marka" name="marka" onChange={handleChange} value={filters.marka}>
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
