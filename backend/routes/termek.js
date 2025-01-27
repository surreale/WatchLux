var express = require('express');
var router = express.Router();
var Db = require('../db/dboperations');

router.get('/', async function(req, res, next) {
 try{
  const termek = await Db.selectTermek();
  res.json(termek);
 }
 catch(error){
  res.status(500).send('Szever hiba!');
 }
});

module.exports = router;
