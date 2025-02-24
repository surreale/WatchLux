import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Range } from 'react-range';
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
  const [genders, setGenders] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMeghajtas, setSelectedMeghajtas] = useState("");
  const [meghajtasok, setMeghajtasok] = useState([]);
  const [selectedVizallosag, setSelectedVizallosag] = useState("");
  const [vizallosagok, setVizallosagok] = useState([]);
  const [selectedSuly, setSelectedSuly] = useState("");
  const [sulyok, setSulyok] = useState([]);
  const [selectedTipus, setSelectedTipus] = useState("");
  const [tipusok, setTipusok] = useState([]);
  const [selectedDatumkijelzes, setSelectedDatumkijelzes] = useState("");
  const [datumkijelzesek, setDatumkijelzesek] = useState([]);
  const [selectedExtrafunkcio, setSelectedExtrafunkcio] = useState("");
  const [extrafunkciok, setExtrafunkciok] = useState([]);
  const [selectedAtokszine, setSelectedAtokszine] = useState("");
  const [atokszinek, setAtokszinek] = useState([]);
  const [selectedAszamlapszine, setSelectedAszamlapszine] = useState("");
  const [aszamlapszinek, setAszamlapszinek] = useState([]);
  const [selectedAtok, setSelectedAtok] = useState("");
  const [atokList, setAtokList] = useState([]);
  const [selectedKristalyuveg, setSelectedKristalyuveg] = useState("");
  const [kristalyuvegek, setKristalyuvegek] = useState([]);
  const [selectedSzamlaptipus, setSelectedSzamlaptipus] = useState("");
  const [szamlaptipusok, setSzamlaptipusok] = useState([]);
  const [selectedOraforma, setSelectedOraforma] = useState("");
  const [oraformak, setOraformak] = useState([]);
  const [selectedSzijszine, setSelectedSzijszine] = useState("");
  const [szijszinek, setSzijszinek] = useState([]);
  const [selectedSzij, setSelectedSzij] = useState("");
  const [szijak, setSzijak] = useState([]);
  const [selectedMaxCsuklomili, setSelectedMaxCsuklomili] = useState("");
  const [maxCsuklomilik, setMaxCsuklomilik] = useState([]);
  

const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(100000);
const [priceRange, setPriceRange] = useState([0, 100000]);


  



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

  useEffect(() => {
    axios.get("http://localhost:8080/ora/nemek")
      .then((response) => {
        setGenders(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a nemek betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/meghajtasok")
      .then((response) => {
        setMeghajtasok(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a meghajtások betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/vizallosagok")
      .then((response) => {
        setVizallosagok(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a vízállóságok betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/sulyok")
      .then((response) => {
        setSulyok(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a súlyok betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/tipusok")
      .then((response) => {
        setTipusok(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a típusok betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/datumkijelzesek")
      .then((response) => {
        setDatumkijelzesek(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a dátumkijelzések betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/extrafunkciok")
      .then((response) => {
        setExtrafunkciok(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt az extrafunkciók betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/atokszinek")
      .then((response) => {
        setAtokszinek(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a tok színek betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/aszamlapszinek")
      .then((response) => {
        console.log("🔍 Számlap színek API válasza:", response.data);
        setAszamlapszinek(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a számlap színek betöltésekor.");
      });
  }, []);
   
  useEffect(() => {
    axios.get("http://localhost:8080/ora/atok")
      .then((response) => {
        console.log("🔍 Tok anyagok API válasza:", response.data);
        setAtokList(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a tok anyagok betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/kristalyuvegek")
      .then((response) => {
        console.log("🔍 Kristályüveg típusok API válasza:", response.data);
        setKristalyuvegek(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a kristályüveg típusok betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/szamlaptipusok")
      .then((response) => {
        console.log("🔍 Számlaptípusok API válasza:", response.data);
        setSzamlaptipusok(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a számlaptípusok betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/oraformak")
      .then((response) => {
        console.log("🔍 Óraformák API válasza:", response.data);
        setOraformak(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt az óraformák betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/szijszinek")
      .then((response) => {
        console.log("🔍 Szíjak színeinek API válasza:", response.data);
        setSzijszinek(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a szíjak színeinek betöltésekor.");
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/ora/szijak")
      .then((response) => {
        console.log("🔍 Szíjak anyagának API válasza:", response.data);
        setSzijak(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a szíjak anyagának betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/maxcsuklomili")
      .then((response) => {
        console.log("🔍 Maximális csuklóméretek API válasza:", response.data);
        setMaxCsuklomilik(response.data);
      })
      .catch(() => {
        console.error("❌ Hiba történt a maximális csuklóméretek betöltésekor.");
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:8080/ora/ar-tartomany")
      .then((response) => {
        if (response.data.minAr !== null && response.data.maxAr !== null) {
          const min = response.data.minAr;
          const max = response.data.maxAr;
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]); // Alapértelmezett árintervallum
        }
      })
      .catch(() => {
        console.error("❌ Hiba történt az árak lekérésekor.");
      });
  }, []);
  
  
  
  

  const handleFilterChange = () => {
    const params = {};
    if (selectedBrand) params.marka = selectedBrand;
    if (selectedGender) params.nem = selectedGender;
    if (selectedMeghajtas) params.meghajtas = selectedMeghajtas;
    if (selectedVizallosag) params.vizallosag = selectedVizallosag;
    if (selectedSuly) params.sulygrammban = selectedSuly;
    if (selectedTipus) params.tipus = selectedTipus;
    if (selectedDatumkijelzes) params.datumkijelzes = selectedDatumkijelzes;
    if (selectedExtrafunkcio) params.extrafunkcio = selectedExtrafunkcio;
    if (selectedAtokszine) params.atokszine = selectedAtokszine;
    if (selectedAszamlapszine) params.aszamlapszine = selectedAszamlapszine;
    if (selectedAtok) params.atok = selectedAtok;
    if (selectedKristalyuveg) params.kristalyuveg = selectedKristalyuveg;
    if (selectedSzamlaptipus) params.szamlaptipus = selectedSzamlaptipus;
    if (selectedOraforma) params.oraforma = selectedOraforma;
    if (selectedSzijszine) params.szijszine = selectedSzijszine;
    if (selectedSzij) params.szij = selectedSzij;
    if (selectedMaxCsuklomili) params.maxcsuklomili = selectedMaxCsuklomili;
    if (priceRange[0] > minPrice || priceRange[1] < maxPrice) {
      params.minAr = priceRange[0];
      params.maxAr = priceRange[1];
    }
    
    
    
    

    axios.get("http://localhost:8080/ora/filtered", { params })
      .then((response) => {
        setFilteredProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
        setCurrentPage(1);
      })
      .catch(() => {
        console.error("❌ Hiba történt a szűrés során.");
      });
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
            <select id="brand-filter" className="brand-dropdown" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="">Válassz márkát</option>
              {brands.map((brand) => (
                <option key={brand.marka} value={brand.marka}>{brand.marka}</option>
              ))}
            </select>
          </div>

          <label htmlFor="gender-filter">Nem:</label>
          <div className="dropdown-container">
            <select id="gender-filter" className="brand-dropdown" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
              <option value="">Válassz nemet</option>
              {genders.map((gender) => (
                <option key={gender.nem} value={gender.nem}>{gender.nem}</option>
              ))}
            </select>
          </div>

          <label htmlFor="meghajtas-filter">Meghajtás:</label>
          <div className="dropdown-container">
            <select id="meghajtas-filter" className="brand-dropdown" value={selectedMeghajtas} onChange={(e) => setSelectedMeghajtas(e.target.value)}>
              <option value="">Válassz meghajtást</option>
              {meghajtasok.map((meghajtas) => (
                <option key={meghajtas.meghajtas} value={meghajtas.meghajtas}>{meghajtas.meghajtas}</option>
              ))}
            </select>
          </div> 
          
          
          <label htmlFor="vizallosag-filter">Vízállóság:</label>
          <div className="dropdown-container">
            <select id="vizallosag-filter" className="brand-dropdown" value={selectedVizallosag} onChange={(e) => setSelectedVizallosag(e.target.value)}>
              <option value="">Válassz vízállóságot</option>
              {vizallosagok.map((vizallosag) => (
                <option key={vizallosag.vizallosag} value={vizallosag.vizallosag}>{vizallosag.vizallosag}</option>
              ))}
              </select>
          </div>

          <label htmlFor="suly-filter">Súly (grammban):</label>
          <div className="dropdown-container">
            <select id="suly-filter" className="brand-dropdown" value={selectedSuly} onChange={(e) => setSelectedSuly(e.target.value)}>
             <option value="">Válassz súlyt</option>
            {sulyok.map((suly) => (
              <option key={suly.sulygrammban} value={suly.sulygrammban}>{suly.sulygrammban} g</option>
            ))}
            </select>
          </div>

          <label htmlFor="tipus-filter">Típus:</label>
          <div className="dropdown-container">
            <select id="tipus-filter" className="brand-dropdown" value={selectedTipus} onChange={(e) => setSelectedTipus(e.target.value)}>
              <option value="">Válassz típust</option>
            {tipusok.map((tipus) => (
              <option key={tipus.tipus} value={tipus.tipus}>{tipus.tipus}</option>
            ))}
            </select>
          </div>

          <label htmlFor="datumkijelzes-filter">Dátumkijelzés:</label>
          <div className="dropdown-container">
            <select id="datumkijelzes-filter" className="brand-dropdown" value={selectedDatumkijelzes} onChange={(e) => setSelectedDatumkijelzes(e.target.value)}>
              <option value="">Válassz dátumkijelzést</option>
            {datumkijelzesek.map((datumkijelzes) => (
              <option key={datumkijelzes.datumkijelzes} value={datumkijelzes.datumkijelzes}>{datumkijelzes.datumkijelzes}</option>
            ))}
            </select>
          </div>

          <label htmlFor="extrafunkcio-filter">Extrafunkció:</label>
          <div className="dropdown-container">
           <select id="extrafunkcio-filter" className="brand-dropdown" value={selectedExtrafunkcio} onChange={(e) => setSelectedExtrafunkcio(e.target.value)}>
            <option value="">Válassz extrafunkciót</option>
          {extrafunkciok.map((extrafunkcio) => (
            <option key={extrafunkcio.extrafunkcio} value={extrafunkcio.extrafunkcio}>{extrafunkcio.extrafunkcio}</option>
          ))}
          </select>
          </div>

          <label htmlFor="atokszine-filter">Tok színe:</label>
          <div className="dropdown-container">
            <select id="atokszine-filter" className="brand-dropdown" value={selectedAtokszine} onChange={(e) => setSelectedAtokszine(e.target.value)}>
              <option value="">Válassz tok színt</option>
            {atokszinek.map((atokszine) => (
              <option key={atokszine.atokszine} value={atokszine.atokszine}>{atokszine.atokszine}</option>
          ))}
          </select>
          </div>

          <label htmlFor="aszamlapszine-filter">Számlap színe:</label>
          <div className="dropdown-container">
            <select id="aszamlapszine-filter" className="brand-dropdown" value={selectedAszamlapszine} onChange={(e) => setSelectedAszamlapszine(e.target.value)}>
              <option value="">Válassz számlap színt</option>
            {aszamlapszinek.map((aszamlapszineObj, index) => (
              <option key={index} value={aszamlapszineObj.aszamlapszine}>{aszamlapszineObj.aszamlapszine}</option>
          ))}
          </select>
          </div>



          <label htmlFor="atok-filter">Tok anyaga:</label>
          <div className="dropdown-container">
            <select id="atok-filter" className="brand-dropdown" value={selectedAtok} onChange={(e) => setSelectedAtok(e.target.value)}>
              <option value="">Válassz tok anyagot</option>
            {atokList.map((atokObj, index) => (
              <option key={index} value={atokObj.atok}>{atokObj.atok}</option>
            ))}
            </select>
          </div>


          <label htmlFor="kristalyuveg-filter">Kristályüveg típusa:</label>
          <div className="dropdown-container">
            <select id="kristalyuveg-filter" className="brand-dropdown" value={selectedKristalyuveg} onChange={(e) => setSelectedKristalyuveg(e.target.value)}>
              <option value="">Válassz kristályüveg típust</option>
            {kristalyuvegek.map((kristalyuvegObj, index) => (
              <option key={index} value={kristalyuvegObj.kristalyuveg}>{kristalyuvegObj.kristalyuveg}</option>
            ))}
          </select>
          </div>



          <label htmlFor="szamlaptipus-filter">Számlaptípus:</label>
          <div className="dropdown-container">
            <select id="szamlaptipus-filter" className="brand-dropdown" value={selectedSzamlaptipus} onChange={(e) => setSelectedSzamlaptipus(e.target.value)}>
              <option value="">Válassz számlaptípust</option>
            {szamlaptipusok.map((szamlaptipusObj, index) => (
              <option key={index} value={szamlaptipusObj.szamlaptipus}>{szamlaptipusObj.szamlaptipus}</option>
            ))}
            </select>
            </div>

            <label htmlFor="oraforma-filter">Óraforma:</label>
            <div className="dropdown-container">
              <select id="oraforma-filter" className="brand-dropdown" value={selectedOraforma} onChange={(e) => setSelectedOraforma(e.target.value)}>
                <option value="">Válassz óraformát</option>
              {oraformak.map((oraformaObj, index) => (
                <option key={index} value={oraformaObj.oraforma}>{oraformaObj.oraforma}</option>
              ))}
            </select>
            </div>

            <label htmlFor="szijszine-filter">Szíj színe:</label>
            <div className="dropdown-container">
              <select id="szijszine-filter" className="brand-dropdown" value={selectedSzijszine} onChange={(e) => setSelectedSzijszine(e.target.value)}>
                <option value="">Válassz szíj színt</option>
              {szijszinek.map((szijszineObj, index) => (
                <option key={index} value={szijszineObj.szijszine}>{szijszineObj.szijszine}</option>
              ))}
            </select>
          </div>

          <label htmlFor="szij-filter">Szíj anyaga:</label>
          <div className="dropdown-container">
            <select id="szij-filter" className="brand-dropdown" value={selectedSzij} onChange={(e) => setSelectedSzij(e.target.value)}>
              <option value="">Válassz szíj anyagot</option>
            {szijak.map((szijObj, index) => (
              <option key={index} value={szijObj.szij}>{szijObj.szij}</option>
            ))}
          </select>
          </div>

          <label htmlFor="maxcsuklomili-filter">Maximális csuklóméret (mm):</label>
          <div className="dropdown-container">
            <select id="maxcsuklomili-filter" className="brand-dropdown" value={selectedMaxCsuklomili} onChange={(e) => setSelectedMaxCsuklomili(e.target.value)}>
              <option value="">Válassz maximális csuklóméretet</option>
            {maxCsuklomilik.map((maxcsuklomiliObj, index) => (
              <option key={index} value={maxcsuklomiliObj.maxcsuklomili}>{maxcsuklomiliObj.maxcsuklomili} mm</option>
            ))}
          </select>
          </div>

          <div className="price-filter">
  <label htmlFor="price-slider">
    Ár: {priceRange[0].toLocaleString()} Ft - {priceRange[1].toLocaleString()} Ft
  </label>
  <Range
    step={100}
    min={minPrice}
    max={maxPrice}
    values={priceRange}
    onChange={(values) => setPriceRange(values)}
    renderTrack={({ props, children }) => (
      <div {...props} style={{ 
        height: '6px', 
        width: '100%', 
        background: '#ddd', 
        borderRadius: '4px', 
        position: 'relative'
      }}>
        {children}
      </div>
    )}
    renderThumb={({ props }) => (
      <div {...props} style={{
        height: '16px',
        width: '16px',
        backgroundColor: '#007bff',
        borderRadius: '50%',
        cursor: 'pointer'
      }} />
    )}
  />
</div>



          <br/>



          <button className="filter-apply-button" onClick={handleFilterChange}>Szűrés alkalmazása</button>
        </div>
      )}

      <div className="products-container">
        <h2 className="products-title">Termékek</h2>
        <div className="products-grid">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <div key={product.oraaz} className="product-card">
                <img
                  src={`/images/${product.kep1}`}
                  alt={product.megnevezes}
                  className="product-image"
                />
                <h3 className="product-name">{product.megnevezes}</h3>
                <p className="product-price product-ar">Ár: {Number(product.ar).toLocaleString('hu-HU')} Ft</p>

                <p className="product-stock">Raktáron: {product.raktar}</p>

                <button
                  className="view-button"
                  onClick={() => navigate(`/product/${product.oraaz}`)}
                >
                  Megtekintés
                </button>
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
