const jwt = require("jsonwebtoken");

const JWT_SECRET = "nagyon_titkos_jelszo";


function authenticateToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Nincs token, hozzáférés megtagadva!" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Érvénytelen vagy lejárt token!" });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
