require('dotenv').config();

const config = require('./dbconfig');
const sql = require('mysql2/promise');

let pool = sql.createPool(config);

async function getProducts() {
  try {
    console.log(config);
    const [rows] = await pool.query('SELECT * FROM oralekerdezes');
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM oralekerdezes WHERE oraaz = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
}

async function getFilterData(filters) {
  let sql = "SELECT * FROM oralekerdezes";
  const conditions = [];
  const values = [];

  if (filters.marka) {
    conditions.push("marka = ?");
    values.push(filters.marka);
  }

  if (filters.nem) {
    conditions.push("nem = ?");
    values.push(filters.nem);
  }

  if (filters.meghajtas) {
    conditions.push("meghajtas = ?");
    values.push(filters.meghajtas);
  }

  if (filters.vizallosag) {
    conditions.push("vizallosag = ?");
    values.push(filters.vizallosag);
  }

  if (filters.sulygrammban) {
    conditions.push("sulygrammban = ?");
    values.push(filters.sulygrammban);
  }

  if (filters.tipus) {
    conditions.push("tipus = ?");
    values.push(filters.tipus);
  }

  if (filters.datumkijelzes) {
    conditions.push("datumkijelzes = ?");
    values.push(filters.datumkijelzes);
  }

  if (filters.extrafunkcio) {
    conditions.push("extrafunkcio = ?");
    values.push(filters.extrafunkcio);
  }

  if (filters.atokszine) {
    conditions.push("atokszine = ?");
    values.push(filters.atokszine);
  }
  
  if (filters.aszamlapszine) {
    conditions.push("aszamlapszine = ?");
    values.push(filters.aszamlapszine);
  }
  
  if (filters.atok) {
    conditions.push("atok = ?");
    values.push(filters.atok);
  }
  
  if (filters.kristalyuveg) {
    conditions.push("kristalyuveg = ?");
    values.push(filters.kristalyuveg);
  }

  if (filters.szamlaptipus) {
    conditions.push("szamlaptipus = ?");
    values.push(filters.szamlaptipus);
  }
  
  if (filters.oraforma) {
    conditions.push("oraforma = ?");
    values.push(filters.oraforma);
  }

  if (filters.szijszine) {
    conditions.push("szijszine = ?");
    values.push(filters.szijszine);
  }
  
  if (filters.szij) {
    conditions.push("szij = ?");
    values.push(filters.szij);
  }
  
  if (filters.maxcsuklomili) {
    conditions.push("maxcsuklomili = ?");
    values.push(filters.maxcsuklomili);
  }
  if (filters.minAr && filters.maxAr) {
    conditions.push("ar BETWEEN ? AND ?");
    values.push(filters.minAr, filters.maxAr);
  }


  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  console.log("🔍 SQL lekérdezés:", sql, "Értékek:", values);

  try {
    const [rows] = await pool.query(sql, values);
    console.log("✅ Szűrt termékek:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba a getFilterData() futtatása közben:", error);
    throw error;
  }
}

async function getBrands() {
  try {
    console.log("🔍 Márkák lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT marka FROM oralekerdezes");
    console.log("✅ Lekérdezett márkák:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a márkák lekérésekor:", error);
    throw error;
  }
}

async function getGenders() {
  try {
    console.log("🔍 Nemek lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT nem FROM oralekerdezes");
    console.log("✅ Lekérdezett nemek:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a nemek lekérésekor:", error);
    throw error;
  }
}

async function getMeghajtasok() {
  try {
    console.log("🔍 Meghajtások lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT meghajtas FROM oralekerdezes");
    console.log("✅ Lekérdezett meghajtások:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a meghajtások lekérésekor:", error);
    throw error;
  }
}

async function getVizallosagok() {
  try {
    console.log("🔍 Vízállóságok lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT vizallosag FROM oralekerdezes");
    console.log("✅ Lekérdezett vízállóságok:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a vízállóságok lekérésekor:", error);
    throw error;
  }
}

async function getSulyok() {
  try {
    console.log("🔍 Súlyok lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT sulygrammban FROM oralekerdezes ORDER BY CAST(sulygrammban AS UNSIGNED)");
    console.log("✅ Lekérdezett súlyok:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a súlyok lekérésekor:", error);
    throw error;
  }
}

async function getTipusok() {
  try {
    console.log("🔍 Típusok lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT tipus FROM oralekerdezes");
    console.log("✅ Lekérdezett típusok:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a típusok lekérésekor:", error);
    throw error;
  }
}

async function getDatumkijelzesek() {
  try {
    console.log("🔍 Dátumkijelzések lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT datumkijelzes FROM oralekerdezes");
    console.log("✅ Lekérdezett dátumkijelzések:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a dátumkijelzések lekérésekor:", error);
    throw error;
  }
}

async function getExtrafunkciok() {
  try {
    console.log("🔍 Extrafunkciók lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT extrafunkcio FROM oralekerdezes");
    console.log("✅ Lekérdezett extrafunkciók:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt az extrafunkciók lekérésekor:", error);
    throw error;
  }
}



async function getAtokszinek() {
  try {
    console.log("🔍 Tok színek lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT atokszine FROM oralekerdezes");
    console.log("✅ Lekérdezett tok színek:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a tok színek lekérésekor:", error);
    throw error;
  }
}

async function getAszamlapszinek() {
  try {
    console.log("🔍 Számlap színek lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT aszamlapszine FROM oralekerdezes");
    console.log("✅ Lekérdezett számlap színek:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a számlap színek lekérésekor:", error);
    throw error;
  }
}

async function getAtok() {
  try {
    console.log("🔍 Tok anyagok lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT atok FROM oralekerdezes");
    console.log("✅ Lekérdezett tok anyagok:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a tok anyagok lekérésekor:", error);
    throw error;
  }
}

async function getKristalyuvegek() {
  try {
    console.log("🔍 Kristályüveg típusok lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT kristalyuveg FROM oralekerdezes");
    console.log("✅ Lekérdezett kristályüveg típusok:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a kristályüveg típusok lekérésekor:", error);
    throw error;
  }
}

async function getSzamlaptipusok() {
  try {
    console.log("🔍 Számlaptípusok lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT szamlaptipus FROM oralekerdezes");
    console.log("✅ Lekérdezett számlaptípusok:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a számlaptípusok lekérésekor:", error);
    throw error;
  }
}

async function getOraformak() {
  try {
    console.log("🔍 Óraformák lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT oraforma FROM oralekerdezes");
    console.log("✅ Lekérdezett óraformák:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt az óraformák lekérésekor:", error);
    throw error;
  }
}

async function getSzijszinek() {
  try {
    console.log("🔍 Szíjak színének lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT szijszine FROM oralekerdezes");
    console.log("✅ Lekérdezett szíjak színei:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a szíjak színének lekérésekor:", error);
    throw error;
  }
}

async function getSzijk() {
  try {
    console.log("🔍 Szíjak anyagának lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT szij FROM oralekerdezes");
    console.log("✅ Lekérdezett szíjak anyagai:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a szíjak anyagának lekérésekor:", error);
    throw error;
  }
}

async function getMaxCsuklomili() {
  try {
    console.log("🔍 Maximális csuklóméret lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT DISTINCT maxcsuklomili FROM oralekerdezes ORDER BY maxcsuklomili");
    console.log("✅ Lekérdezett maximális csuklóméretek:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a maximális csuklóméret lekérésekor:", error);
    throw error;
  }
}

async function getPriceRange() {
  try {
    console.log("🔍 Árintervallum lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT MIN(ar) AS minAr, MAX(ar) AS maxAr FROM oralekerdezes");
    
    if (rows.length > 0) {
      console.log("✅ Lekérdezett árintervallum:", rows[0]);
      return { minAr: rows[0].minAr, maxAr: rows[0].maxAr }; // Visszaad egy objektumot
    } else {
      return { minAr: 0, maxAr: 100000 }; // Ha nincs adat, egy alapértelmezett tartományt küld vissza
    }
  } catch (error) {
    console.error("❌ Hiba történt az árintervallum lekérésekor:", error);
    throw error;
  }
}

async function searchProducts(query) {
  try {
    const keywords = query.trim().split(/\s+/); // szavak szétválasztása szóköz szerint
    const conditions = [];
    const values = [];

    for (const word of keywords) {
      const like = `%${word}%`;

      // Egy szó több mezőben keres
      conditions.push(`(
        megnevezes LIKE ? OR 
        marka LIKE ? OR 
        tipus LIKE ? OR
        CAST(ar AS CHAR) LIKE ? OR
        nem LIKE ? OR
        meghajtas LIKE? OR
        atokszine LIKE ? OR
        aszamlapszine LIKE ? OR
        atok LIKE ? OR
        kristalyuveg LIKE ? OR
        szamlaptipus LIKE ? OR
        oraforma LIKE ? OR
        szij LIKE ? 

        
      )`);
      
      // Minden mezőhöz hozzáadjuk a paramétert
      values.push(like, like, like, like, like, like, like, like, like, like, like, like, like);
    }

    const sql = `
      SELECT * FROM oralekerdezes
      WHERE ${conditions.join(" AND ")}
    `;

    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a keresés során:", error);
    throw error;
  }
}


async function registerUser(nev, tel, email, jelszo) {
  try {
      const sqlQuery = `
          INSERT INTO vasarlo (nev, tel, email, jelszo) 
          VALUES (?, ?, ?, ?)
      `;

      const [result] = await pool.query(sqlQuery, [nev, tel, email, jelszo]);
      return result;
  } catch (error) {
      console.error("❌ Hiba a regisztráció során:", error);
      throw error;
  }
}

async function checkExistingUser(email, tel) {
  try {
      const sqlQuery = `
          SELECT * FROM vasarlo WHERE email = ? OR tel = ?
      `;
      const [rows] = await pool.query(sqlQuery, [email, tel]);

      return rows.length > 0 ? true : false; // Ha talál egyezést, akkor true-t ad vissza
  } catch (error) {
      console.error("❌ Hiba az ellenőrzés során:", error);
      throw error;
  }
}


async function getUserByEmail(email) {
  try {
      const sqlQuery = `SELECT * FROM vasarlo WHERE email = ?`;
      const [rows] = await pool.query(sqlQuery, [email]);
      return rows.length > 0 ? rows[0] : null;
  } catch (error) {
      console.error("❌ Hiba a felhasználó lekérésekor:", error);
      throw error;
  }
} 

async function getUserProfile(userId) {
  try {
      const sqlQuery = `SELECT nev, tel, email FROM vasarlo WHERE vasarloaz = ?`;
      const [rows] = await pool.query(sqlQuery, [userId]); 
      
      if (rows.length === 0) {
          throw new Error("Felhasználó nem található!");
      }

      return rows[0];
  } catch (error) {
      console.error("❌ Hiba történt a profiladatok lekérésekor:", error);
      throw error;
  }
}

async function updateUserProfile(userId, nev, tel) {
  try {
      const sqlQuery = `UPDATE vasarlo SET nev = ?, tel = ? WHERE vasarloaz = ?`;
      const [result] = await pool.query(sqlQuery, [nev, tel, userId]);

      if (result.affectedRows === 0) {
          throw new Error("A frissítés nem történt meg! Az ID lehet érvénytelen.");
      }

      return { message: "Profil sikeresen frissítve!" };
  } catch (error) {
      console.error("❌ Hiba történt a profil frissítésekor:", error);
      throw error;
  }
}
const crypto = require("crypto");

async function changeUserPassword(userId, oldPassword, newPassword) {
  try {
      const oldPasswordHash = crypto.createHash("sha256").update(oldPassword).digest("hex");
      const newPasswordHash = crypto.createHash("sha256").update(newPassword).digest("hex");

      // 🔹 Ellenőrizzük, hogy a régi jelszó helyes-e
      const checkQuery = `SELECT jelszo FROM vasarlo WHERE vasarloaz = ?`;
      const [rows] = await pool.query(checkQuery, [userId]);

      if (rows.length === 0) {
          throw new Error("Felhasználó nem található!");
      }

      if (rows[0].jelszo !== oldPasswordHash) {
          throw new Error("Hibás régi jelszó!");
      }

      // 🔹 Jelszó frissítése
      const updateQuery = `UPDATE vasarlo SET jelszo = ? WHERE vasarloaz = ?`;
      await pool.query(updateQuery, [newPasswordHash, userId]);

      return { message: "Sikeres jelszó módosítás!" };
  } catch (error) {
      console.error("❌ Hiba történt a jelszó módosítása közben:", error);
      throw error;
  }
}



async function insertOrGetGuestBuyer({ name, email, phone }) {
  try {
    const [existing] = await pool.query(
      `SELECT vasarloaz FROM vasarlo 
       WHERE nev = ? AND email = ? AND tel = ? AND jelszo IS NULL`,
      [name, email, phone]
    );

    if (existing.length > 0) {
      console.log("🔁 Létező vendég:", existing[0]);
      return { insertId: existing[0].vasarloaz };
    }

    const [result] = await pool.query(
      "INSERT INTO vasarlo (nev, email, tel, jelszo) VALUES (?, ?, ?, ?)",
      [name, email, phone, null]
    );
    console.log("✅ Új vendég beszúrva:", result);
    return result;
  } catch (error) {
    console.error("❌ HIBA a vendég mentésekor:", error);
    throw error;
  }
}











async function insertShippingData({ name, address, postalCode, city }) {
  const query = `INSERT INTO szallitassz (nev, cim, iranyszam, varos) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(query, [name, address, postalCode, city]);
  return result;
}

async function insertInvoice({ vasarloaz, szallitasaz, fizetesmodaz, adoszam }) {
  const query = `
    INSERT INTO szamla (vasarloaz, szallitasaz, fizetesmodaz, adoszam, datum)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const [result] = await pool.query(query, [
    vasarloaz,
    szallitasaz,
    fizetesmodaz,
    adoszam,
  ]);
  return result;
}



async function insertOrderItem({ szamlaaz, oraaz, db }) {
  const query = `INSERT INTO megrendeles (szamlaaz, oraaz, db) VALUES (?, ?, ?)`;
  const [result] = await pool.query(query, [szamlaaz, oraaz, db]);
  return result;
}

module.exports = {
  getProducts,
  getProductById,
  getFilterData,
  getBrands,
  getGenders,
  getMeghajtasok,
  getVizallosagok,
  getSulyok,
  getTipusok,
  getDatumkijelzesek,
  getExtrafunkciok,
  getAtokszinek,
  getAszamlapszinek,
  getAtok,
  getKristalyuvegek,
  getSzamlaptipusok,
  getOraformak,
  getSzijszinek,
  getSzijk,
  getMaxCsuklomili,
  getPriceRange,
  searchProducts,
  registerUser,
  checkExistingUser,
  getUserByEmail,
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  insertOrGetGuestBuyer,
  insertShippingData,
  insertInvoice,
  insertOrderItem
};
