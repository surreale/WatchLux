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

async function getFilterData(filters){
  let sql = "SELECT * FROM oralekerdezes";

  const conditions = [];
  const values = [];

  if(filters.marka){
    conditions.push("marka = ?");
    values.push(filters.marka);
  }
  if(filters.tipus){
    conditions.push("tipus = ?");
    values.push(filters.tipus);
  }
  if(filters.szijszine){
    conditions.push("szijszine = ?");
    values.push(filters.szijszine);
  }
  if(filters.aszamlapszine){
    conditions.push("aszamlapszine = ?");
    values.push(filters.aszamlapszine);
  }
  if(filters.atok){
    conditions.push("atok = ?");
    values.push(filters.atok);
  }
  if(filters.atokszine){
    conditions.push("atokszine = ?");
    values.push(filters.atokszine);
  }
  if(filters.kristalyuveg){
    conditions.push("kristalyuveg = ?");
    values.push(filters.kristalyuveg);
  }
  if(filters.oraforma){
    conditions.push("oraforma = ?");
    values.push(filters.oraforma);
  }
  if(filters.szij){
    conditions.push("szij = ?");
    values.push(filters.szij);
  }
  if(filters.maxcsuklomili){
    conditions.push("maxcsuklomili = ?");
    values.push(filters.maxcsuklomili);
  }
  if(filters.datumkijelzes){
    conditions.push("datumkijelzes = ?");
    values.push(filters.datumkijelzes);
  }
  if(filters.vizallosag){
    conditions.push("vizallosag = ?");
    values.push(filters.vizallosag);
  }
  if(filters.meghajtas){
    conditions.push("meghajtas = ?");
    values.push(filters.meghajtas);
  }
  if(filters.nem){
    conditions.push("nem = ?");
    values.push(filters.nem);
  }
  if(filters.sulygrammban){
    conditions.push("sulygrammban = ?");
    values.push(filters.sulygrammban);
  }
  if(filters.extrafunkcio){
    conditions.push("extrafunkcio = ?");
    values.push(filters.extrafunkcio);
  }
  if(filters.raktar){
    conditions.push("raktar = ?");
    values.push(filters.raktar);
  }
  if(filters.ar){
    conditions.push("ar = ?");
    values.push(filters.ar);
  }
  if(conditions.length > 0){
    sql += " WHERE " + conditions.join(" AND ");
  }
  console.log("sql:", sql);

  try{
    const [rows] = await pool.query(sql, values);
    return rows;
  }
  catch(error){
    console.error("Hiba a getFilterData() futtatása közben:", error);
    throw error;
  }
}

async function getUniqueValues(column, table) {
  try {
    const [rows] = await pool.query(`SELECT DISTINCT ${column} FROM ${table}`);
    return rows.map(row => row[column]); // Csak az értékeket küldjük vissza
  } catch (error) {
    console.error(`Hiba történt a ${column} adatok lekérésekor a ${table} táblából:`, error);
    throw error;
  }
}

module.exports = {
  getProducts,
  getProductById,
  getFilterData,
  getUniqueValues
};

