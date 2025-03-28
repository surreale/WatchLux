const express = require("express");
const router = express.Router();
const db = require("../db/dboperations");


async function isValidUserId(userId) {
  if (!userId || isNaN(userId)) return false;

  try {
    const user = await db.getUserProfile(userId);
    return !!user;
  } catch {
    return false;
  }
}

router.post("/finalize", async (req, res) => {
  const { userId, cart, shipping, billing, sameAsShipping } = req.body;

  try {
    let vasarloaz = null;

    
    if (await isValidUserId(userId)) {
      vasarloaz = parseInt(userId);
      console.log(" Bejelentkezett felhasználó:", vasarloaz);
    } else {
      
      const newVasarlo = await db.insertOrGetGuestBuyer({
        name: billing.name,
        email: billing.email,
        phone: billing.phone,
      });
      vasarloaz = newVasarlo.insertId;
      console.log(" Új vendég mentve:", vasarloaz);
    }

    
    const szallitasAdatok = sameAsShipping ? billing : shipping;
    const szallitasszRes = await db.insertShippingData({
      name: szallitasAdatok.name,
      address: szallitasAdatok.address,
      postalCode: szallitasAdatok.postalCode,
      city: szallitasAdatok.city,
    });

    const szallitasaz = szallitasszRes.insertId;

   
    const szamlaRes = await db.insertInvoice({
      vasarloaz,
      szallitasaz,
      fizetesmodaz: 2, 
      adoszam: billing.taxId || null, 
    });

    const szamlaaz = szamlaRes.insertId;

   
    for (const item of cart) {
      await db.insertOrderItem({
        szamlaaz,
        oraaz: item.oraaz,
        db: item.mennyiseg || 1,
      });
    }

    res.status(201).json({ message: " Rendelés sikeresen mentve!", invoiceId: szamlaaz });

  } catch (error) {
    console.error(" Hiba a rendelés mentésekor:", error);
    res.status(500).json({ error: "Szerverhiba történt!", details: error.message });
  }
});

module.exports = router;
