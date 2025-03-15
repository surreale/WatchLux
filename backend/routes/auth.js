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

        // 🔹 Jelszó validáció a backendben is
        if (jelszo.length < 8 || !/[A-Z]/.test(jelszo) || !/[a-z]/.test(jelszo)) {
            return res.status(400).json({ error: "A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kis- és nagybetűt." });
        }

        const existingUser = await db.checkExistingUser(email, tel);
        if (existingUser) {
            return res.status(400).json({ error: "Már létezik ilyen e-mail vagy telefonszám!" });
        }

        const hashedPassword = crypto.createHash("sha256").update(jelszo).digest("hex");

        await db.registerUser(nev, tel.replace("+", ""), email, hashedPassword);

        res.status(201).json({ message: "Sikeres regisztráció!" });
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


module.exports = router;
