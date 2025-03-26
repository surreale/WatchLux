const express = require("express");
const crypto = require("crypto");
const db = require("../db/dboperations");

const router = express.Router();

// 🔹 Regisztráció végpont
router.post("/register", async (req, res) => {
    try {
      const { nev, tel, email, jelszo } = req.body;
  
      if (!nev || !tel || !email || !jelszo) {
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
      }
  
      if (jelszo.length < 8 || !/[A-Z]/.test(jelszo) || !/[a-z]/.test(jelszo)) {
        return res.status(400).json({ error: "A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kis- és nagybetűt." });
      }
  
      const existingUser = await db.checkExistingUser(email, tel);
      if (existingUser) {
        return res.status(400).json({ error: "Már létezik ilyen e-mail vagy telefonszám!" });
      }
  
      const hashedPassword = crypto.createHash("sha256").update(jelszo).digest("hex");
  
      const result = await db.registerUser(nev, tel.replace("+", ""), email, hashedPassword);
  
      // 🔥 Itt visszaküldjük a userId-t
      res.status(201).json({ message: "Sikeres regisztráció!", userId: result.insertId });
    } catch (error) {
      console.error("❌ Hiba történt a regisztráció során:", error);
      res.status(500).json({ error: "Szerverhiba, próbáld újra később!" });
    }
  });
  

router.post("/login", async (req, res) => {
    try {
        const { email, jelszo } = req.body;

        if (!email || !jelszo) {
            return res.status(400).json({ error: "Az e-mail és a jelszó megadása kötelező!" });
        }

        // 🔹 Jelszó SHA-256 titkosítása
        const hashedPassword = crypto.createHash("sha256").update(jelszo).digest("hex");

        // 🔹 Ellenőrizzük, hogy létezik-e a felhasználó
        const user = await db.getUserByEmail(email);

        if (!user || user.jelszo !== hashedPassword) {
            return res.status(401).json({ error: "Hibás e-mail vagy jelszó!" });
        }

        res.status(200).json({ message: "Sikeres bejelentkezés!", user });
    } catch (error) {
        console.error("❌ Hiba történt a bejelentkezés során:", error);
        res.status(500).json({ error: "Szerverhiba, próbáld újra később!" });
    }
});
router.get("/profile", async (req, res) => {
    try {
        const userId = req.query.userId;  // 🔥 Mostantól az userId helyesen jön frontendről

        if (!userId) {
            return res.status(400).json({ error: "Nincs bejelentkezett felhasználó!" });
        }

        const userData = await db.getUserProfile(userId);
        if (!userData) {
            return res.status(404).json({ error: "Felhasználó nem található!" });
        }

        res.json(userData);
    } catch (error) {
        console.error("❌ Hiba történt a profil lekérésekor:", error);
        res.status(500).json({ error: "Hiba történt a profil lekérésekor." });
    }
});
  
  // 🔹 Profil frissítése
  router.put("/update", async (req, res) => {
    try {
        const { userId, nev, tel } = req.body;

        if (!userId || !nev || !tel) {
            return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
        }

        const result = await db.updateUserProfile(userId, nev, tel);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Felhasználó nem található!" });
        }

        res.json({ message: "Profil frissítve!" });
    } catch (error) {
        console.error("❌ Hiba történt a profil frissítésekor:", error);
        res.status(500).json({ error: "Szerverhiba történt!" });
    }
});

  
  // 🔹 Jelszó módosítása
  router.put("/change-password", async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
        }

        await db.changeUserPassword(userId, oldPassword, newPassword);
        res.json({ message: "Sikeres jelszó módosítás!" });
    } catch (error) {
        console.error("❌ Hiba történt a jelszó módosítása közben:", error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/address", async (req, res) => {
    try {
      const { userId, name, address, postalCode, city } = req.body;
  
      if (!userId || !name || !address || !postalCode || !city) {
        return res.status(400).json({ error: "Minden mezőt ki kell tölteni!" });
      }
  
      const result = await db.insertShippingData({
        name,
        address,
        postalCode,
        city,
      });
  
      // kapcsoljuk össze a vásárlóval is, ha kell (pl. külön tábla esetén)
  
      res.status(201).json({ message: "Számlázási adatok elmentve!", id: result.insertId });
    } catch (error) {
      console.error("❌ Hiba a számlázási adatok mentésekor:", error);
      res.status(500).json({ error: "Szerverhiba a számlázási adatok mentésekor." });
    }
  });
  
module.exports = router;
