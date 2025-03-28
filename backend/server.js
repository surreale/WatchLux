const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser'); 


const indexRouter = require('./routes/index');
const termekRouter = require('./routes/termek');
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order"); 

const app = express();


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/auth", authRouter);
app.use("/order", orderRouter); 
app.use("/", indexRouter);
app.use("/ora", termekRouter);

module.exports = app;
