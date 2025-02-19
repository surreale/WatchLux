const express = require("express");
const router = express.Router();
const db = require("../db/dboperations");

// Márkák lekérése a szűrőhöz
router.get('/filtered', async (req, res) => {
  try {
    const { marka } = req.query;

    if (!marka) {
      return res.status(400).json({ error: "Márka paraméter hiányzik!" });
    }

    const filteredProducts = await db.getFilterData({ marka });

    res.json(filteredProducts);
  } catch (error) {
    console.error('Hiba történt a szűrés során:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});


module.exports = router;
