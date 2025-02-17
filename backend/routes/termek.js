const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../db/dboperations');

// Minden termék lekérdezése
router.get('/oralekerdezes', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Hiba történt a termékek lekérdezésekor:', error);
    res.status(500).send(error);
  }
});

// Egy adott termék lekérdezése az ID alapján
router.get('/oralekerdezes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Nem található ilyen termék.' });
    }
    res.json(product);
  } catch (error) {
    console.error('Hiba történt az ID alapján történő lekérdezés során:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});

//http://localhost:8080/adatok/filtered?marka=ford&tipus=autó&szijszine=sötét
router.get('/filtered2', async (req, res) => {
  try{
    const filters={
      marka: req.query.marka,
      tipus: req.query.tipus,
      szijszine: req.query.szijszine,
      aszamlapszine: req.query.aszamlapszine,
      atok: req.query.atok,
      atokszine: req.query.atokszine,
      kristalyuveg: req.query.kristalyuveg,
      oraforma: req.query.oraforma,
      szij: req.query.szij,
      maxcsuklomili: req.query.maxcsuklomili,
      datumkijelzes: req.query.datumkijelzes,
      vizallosag: req.query.vizallosag,
      nem: req.query.nem,
      sulygrammban: req.query.sulygrammban,
      extrafunkcio: req.query.extrafunkcio,
      raktar: req.query.raktar,
      ar: req.query.ar,
      meghajtas: req.query.meghajtas,
    };
    const results = await db.getFilterData(filters);
    res.json(results);

  }
  catch (error) {
    res.status(500).json({ error: 'Hiba történt az adatok lekérésekor.' });
  }
});

module.exports = router;
