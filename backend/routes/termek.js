const express = require('express');
const router = express.Router();
const db = require('../db/dboperations'); // 🔹 EZ HIÁNYZOTT!!

// Minden termék lekérdezése
router.get('/oralekerdezes', async (req, res) => {
  try {
    const products = await db.getProducts(); // 🔹 `db.getProducts()` kell
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

// 🔹 Szűrés API
router.get('/filtered2', async (req, res) => {
  try {
    const filters = {
      marka: req.query.marka || null,
    };

    console.log("🔍 Kapott szűrők:", filters);

    const results = await db.getFilterData(filters); // 🔹 Ezt kell hívni
    console.log("✅ Szűrt adatok:", results);
    
    res.json(results);
  } catch (error) {
    console.error("❌ Hiba történt a szűrt adatok lekérésekor:", error);
    res.status(500).json({ error: "Hiba történt az adatok lekérésekor." });
  }
});

module.exports = router;
