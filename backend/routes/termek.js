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



router.get('/filtered', async (req, res) => {
  try {
    const { marka, nem, meghajtas} = req.query;

    if (!marka && !nem && !meghajtas ) {
      return res.status(400).json({ error: "Legalább egy szűrési feltétel megadása kötelező!" });
    }

    const filteredProducts = await db.getFilterData({ marka, nem, meghajtas });

    res.json(filteredProducts);
  } catch (error) {
    console.error('❌ Hiba történt a szűrés során:', error);
    res.status(500).send('Hiba történt az adatok lekérésekor.');
  }
});
module.exports = router;
