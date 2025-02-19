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


async function getUniqueValues(column, table) {
  try {
    console.log(`🔍 SQL lekérdezés: SELECT DISTINCT ?? FROM ??`, [column, table]);

    const [rows] = await pool.query(`SELECT DISTINCT ?? FROM ??`, [column, table]);

    console.log("✅ Lekérdezett értékek:", rows);
    return rows.map(row => row[column]); 
  } catch (error) {
    console.error(`❌ Hiba a ${column} oszlop lekérésekor a ${table} táblából:`, error);
    throw error;
  }
}

async function getBrands() {
  try {
    console.log("🔍 Márkák lekérdezése az adatbázisból...");
    const [rows] = await pool.query("SELECT markaaz, marka FROM marka");
    console.log("✅ Lekérdezett márkák:", rows);
    return rows;
  } catch (error) {
    console.error("❌ Hiba történt a márkák lekérésekor:", error);
    throw error;
  }
}
module.exports = {
  getProducts,
  getProductById,
  getFilterData,
  getUniqueValues,
  getBrands,
};

