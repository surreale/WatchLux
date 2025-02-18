import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css"; // Stílusfájl

const Filter = ({ setFilteredProducts }) => {
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({
    marka: [], tipus: [], szijszine: [], aszamlapszine: [], atok: [], 
    atokszine: [], kristalyuveg: [], oraforma: [], szij: [], 
    maxcsuklomili: [], datumkijelzes: [], vizallosag: [], nem: [], 
    sulygrammban: [], extrafunkcio: [], raktar: [], ar: [], meghajtas: []
  });

  // Magyar elnevezések beállítása
  const filterLabels = {
    marka: "Márka",
    tipus: "Típus",
    szijszine: "Szíj színe",
    aszamlapszine: "Számlap színe",
    atok: "Tok",
    atokszine: "Tok színe",
    kristalyuveg: "Kristályüveg",
    oraforma: "Óraforma",
    szij: "Szíj típusa",
    maxcsuklomili: "Maximális csuklóméret (mm)",
    datumkijelzes: "Dátum kijelzés",
    vizallosag: "Vízállóság",
    nem: "Nem",
    sulygrammban: "Súly (gramm)",
    extrafunkcio: "Extra funkciók",
    raktar: "Raktár",
    ar: "Ár",
    meghajtas: "Meghajtás"
  };

  // **Adatok betöltése az API-ból és a comboboxok feltöltése**
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/adatok/filtered2");
        const data = response.data;

        if (!Array.isArray(data)) {
          console.error("Hibás adatstruktúra az API válasznál:", data);
          return;
        }

        // Egyedi értékek kinyerése az API adatokból
        const uniqueValues = (key) => [...new Set(data.map(item => item[key]).filter(value => value))];

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

        console.log("Betöltött adatok:", options);

      } catch (error) {
        console.error("Hiba a szűrő opciók betöltésekor:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // **Szűrők módosítása**
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // **Szűrt termékek lekérése**
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/adatok/filtered2", {
          params: filters,
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Hiba történt a szűrt termékek lekérésekor:", error);
      }
    };

    fetchFilteredProducts();
  }, [filters, setFilteredProducts]);

  return (
    <div className="filter-container">
      <h2>🔍 Termék Szűrés</h2>
      <div className="filter-form">
        {Object.keys(options).map((key) => (
          <div className="filter-group" key={key}>
            <label htmlFor={key}>{filterLabels[key] || key}</label>
            <select id={key} name={key} onChange={handleChange}>
              <option value="">-- {filterLabels[key] || key} --</option>
              {options[key].length > 0 ? (
                options[key].map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))
              ) : (
                <option value="" disabled>Nincs elérhető adat</option>
              )}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
