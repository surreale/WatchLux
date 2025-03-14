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




module.exports = router;
