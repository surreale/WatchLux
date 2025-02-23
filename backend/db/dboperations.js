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




module.exports = {
  getProducts,
  getProductById,
  getFilterData,
  getBrands,
  getGenders,
  getMeghajtasok,
  
  
};
