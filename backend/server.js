const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const termekRouter = require('./routes/termek');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ora', termekRouter);
app.use(bodyParser.json()); // 🔥 Engedélyezi a JSON adatokat a POST kérésekhez
app.use(bodyParser.urlencoded({ extended: true }));
module.exports = app;
