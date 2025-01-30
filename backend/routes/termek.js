const express = require('express');
const router = express.Router();
const { selectTermek } = require('../db/dboperations'); // Importáljuk a függvényt

// Oralekerdezes végpont
router.get('/oralekerdezes', async (req, res) => {
  try {
    const termekek = await selectTermek(); // Lekérdezés az adatbázisból
    res.json(termekek); // JSON válasz a frontendnek
  } catch (error) {
    console.error('Hiba történt az oralekerdezes lekérdezésekor:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor');
  }
});

module.exports = router;
