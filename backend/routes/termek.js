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
    res.status(500).send('Hiba történt az adatok lekérésekor.');
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

module.exports = router;
