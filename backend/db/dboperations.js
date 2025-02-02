const config = require('./dbconfig');
const sql = require('mysql2/promise');

let pool = sql.createPool(config);

async function getProducts() {
  try {
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

module.exports = {
  getProducts,
  getProductById,
};
