const express = require("express");
const crypto = require("crypto"); // SHA-256 titkosításhoz
const db = require("../db/dboperations"); // Az adatbázis műveletek kezelése

const router = express.Router();

// 🔹 Regisztráció végpont
router.post("/register", async (req, res) => {
    try {
        const { nev, tel, email, jelszo } = req.body;

        if (!nev || !tel || !email || !jelszo) {
            return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
        }

        // SHA-256 jelszó titkosítás
        const hashedPassword = crypto.createHash("sha256").update(jelszo).digest("hex");

        // 🔥 Helyes adatbázis beszúrás (fix)
        await db.registerUser(nev, tel, email, hashedPassword);

        res.status(201).json({ message: "Sikeres regisztráció!" });
    } catch (error) {
        console.error("❌ Hiba történt a regisztráció során:", error);
        res.status(500).json({ error: "Szerverhiba, próbáld újra később!" });
    }
});
module.exports = router;
