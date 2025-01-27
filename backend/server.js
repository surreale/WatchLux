const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ora',
});

db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódáskor:', err);
    return;
  }
  console.log('Kapcsolódás a MySQL adatbázishoz sikeres!');
});

app.get('/api/oralekerdezesek', (req, res) => {
  const query = 'SELECT * FROM oralekerdezesek';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Hiba a lekérdezés során:', err);
      res.status(500).send('Adatbázis hiba');
      return;
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend szerver fut a ${PORT} porton.`);
});
