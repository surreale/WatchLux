const express = require("express");
const router = express.Router();
const db = require("../db/dboperations");

router.get('/oralekerdezes', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Hiba történt a termékek lekérésekor:', error);
    res.status(500).send(error);
  }
});

router.get('/oralekerdezes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Nem található ilyen termék.' });
    }
    res.json(product);
  } catch (error) {
    console.error('Hiba történt az ID alapján történő lekérdezés során:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/brands', async (req, res) => {
  try {
    const brands = await db.getBrands();
    res.json(brands);
  } catch (error) {
    console.error('Hiba történt a márkák lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/nemek', async (req, res) => {
  try {
    const genders = await db.getGenders();
    res.json(genders);
  } catch (error) {
    console.error('Hiba történt a nemek lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/meghajtasok', async (req, res) => {
  try {
    const meghajtasok = await db.getMeghajtasok();
    res.json(meghajtasok);
  } catch (error) {
    console.error('Hiba történt a meghajtások lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/vizallosagok', async (req, res) => {
  try {
    const vizallosagok = await db.getVizallosagok();
    res.json(vizallosagok);
  } catch (error) {
    console.error('❌ Hiba történt a vízállóságok lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/sulyok', async (req, res) => {
  try {
    const sulyok = await db.getSulyok();
    res.json(sulyok);
  } catch (error) {
    console.error('❌ Hiba történt a súlyok lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/tipusok', async (req, res) => {
  try {
    const tipusok = await db.getTipusok();
    res.json(tipusok);
  } catch (error) {
    console.error('❌ Hiba történt a típusok lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/datumkijelzesek', async (req, res) => {
  try {
    const datumkijelzesek = await db.getDatumkijelzesek();
    res.json(datumkijelzesek);
  } catch (error) {
    console.error('❌ Hiba történt a dátumkijelzések lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/extrafunkciok', async (req, res) => {
  try {
    const extrafunkciok = await db.getExtrafunkciok();
    res.json(extrafunkciok);
  } catch (error) {
    console.error('❌ Hiba történt az extrafunkciók lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/atokszinek', async (req, res) => {
  try {
    const atokszinek = await db.getAtokszinek();
    res.json(atokszinek);
  } catch (error) {
    console.error('❌ Hiba történt a tok színek lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/aszamlapszinek', async (req, res) => {
  try {
    const aszamlapszinek = await db.getAszamlapszinek();
    res.json(aszamlapszinek);
  } catch (error) {
    console.error('❌ Hiba történt a számlap színek lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/atok', async (req, res) => {
  try {
    const atok = await db.getAtok();
    res.json(atok);
  } catch (error) {
    console.error('❌ Hiba történt a tok anyagok lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/kristalyuvegek', async (req, res) => {
  try {
    const kristalyuvegek = await db.getKristalyuvegek();
    res.json(kristalyuvegek);
  } catch (error) {
    console.error('❌ Hiba történt a kristályüveg típusok lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/szamlaptipusok', async (req, res) => {
  try {
    const szamlaptipusok = await db.getSzamlaptipusok();
    res.json(szamlaptipusok);
  } catch (error) {
    console.error('❌ Hiba történt a számlaptípusok lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/oraformak', async (req, res) => {
  try {
    const oraformak = await db.getOraformak();
    res.json(oraformak);
  } catch (error) {
    console.error('❌ Hiba történt az óraformák lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/szijszinek', async (req, res) => {
  try {
    const szijszinek = await db.getSzijszinek();
    res.json(szijszinek);
  } catch (error) {
    console.error('❌ Hiba történt a szíjak színének lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/szijak', async (req, res) => {
  try {
    const szijak = await db.getSzijk();
    res.json(szijak);
  } catch (error) {
    console.error('❌ Hiba történt a szíjak anyagának lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/maxcsuklomili', async (req, res) => {
  try {
    const maxcsuklomili = await db.getMaxCsuklomili();
    res.json(maxcsuklomili);
  } catch (error) {
    console.error('❌ Hiba történt a maximális csuklóméret lekérésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/ar-tartomany', async (req, res) => {
  try {
    const priceRange = await db.getPriceRange();
    res.json(priceRange);
  } catch (error) {
    console.error("❌ Hiba történt az árintervallum lekérésekor:", error);
    res.status(500).send("Hiba történt az adatok lekérésekor.");
  }
});



router.get('/filtered', async (req, res) => {
  try {
    const { marka, nem, meghajtas, vizallosag, sulygrammban, tipus, datumkijelzes, extrafunkcio, atokszine, aszamlapszine, atok, kristalyuveg, szamlaptipus,oraforma , szijszine, szij, maxcsuklomili,minAr, maxAr} = req.query; // 🔥 JAVÍTVA: vizallosagok → vizallosag

    if (!marka && !nem && !meghajtas && !vizallosag &&!sulygrammban && !tipus && !datumkijelzes && !extrafunkcio && !atokszine && !aszamlapszine && !atok && !kristalyuveg &&!szamlaptipus && !oraforma &&!szijszine &&!szij &&!maxcsuklomili &&!minAr && !maxAr) {
      return res.status(400).json({ error: "Legalább egy szűrési feltétel megadása kötelező!" });
    }

    const filteredProducts = await db.getFilterData({ marka, nem, meghajtas, vizallosag, sulygrammban, tipus, datumkijelzes, extrafunkcio, atokszine, aszamlapszine, atok, kristalyuveg, szamlaptipus, oraforma, szijszine, szij, maxcsuklomili,minAr, maxAr });

    res.json(filteredProducts);
  } catch (error) {
    console.error('❌ Hiba történt a szűrés során:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query; // Lekérjük a keresési kifejezést
  if (!query) {
    return res.status(400).json({ error: "A keresési kifejezés nem lehet üres!" });
  }

  try {
    const products = await db.searchProducts(query); // 🔄 Létrehozunk egy új adatbázis függvényt
    res.json(products);
  } catch (error) {
    console.error('Hiba történt a keresés során:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});


module.exports = router;
