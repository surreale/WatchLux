const express = require("express");
const router = express.Router();
const db = require("../db/dboperations");

// Márkák lekérése a szűrőhöz
router.get("/markak", async (req, res) => {
  try {
    const markak = await db.getUniqueValues("marka", "marka");
 // Az adatbázis megfelelő mezőjét kell használni
    res.json(markak);
  } catch (error) {
    console.error("Hiba történt a márkák lekérésekor:", error);
    res.status(500).json({ error: "Nem sikerült lekérni a márkákat." });
  }
});

module.exports = router;
