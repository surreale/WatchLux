const express = require("express");
const router = express.Router();
const db = require("../db/dboperations");

// 🔹 Szűrés API (POST metódussal)
router.post('/filtered2', async (req, res) => {
  try {
    console.log("📩 Beérkezett POST kérés a /filtered2 végpontra!");
    console.log("🔍 Kapott szűrők:", req.body);

    const filters = req.body;
    if (!filters || Object.keys(filters).length === 0) {
      return res.status(400).json({ error: "Hiányzó szűrők a kérésben!" });
    }

    const results = await db.getFilterData(filters);
    console.log("✅ Szűrt adatok:", results);

    res.json(results);
  } catch (error) {
    console.error("❌ Hiba történt a szűrt adatok lekérésekor:", error);
    res.status(500).json({ error: "Hiba történt az adatok lekérésekor." });
  }
});

// 🔹 Összes termék lekérése
router.get('/oralekerdezes', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Hiba történt a termékek lekérésekor:', error);
    res.status(500).send(error);
  }
});

// 🔹 Egy adott termék lekérése az ID alapján
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

module.exports = router;
