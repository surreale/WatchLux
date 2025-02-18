var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const termekRouter = require("./routes/termek");

const cors = require('cors'); //Cross-Origin Resource Sharing 
const filtersRouter = require("./routes/filters"); // Új filter route
var app = express();



var corsOptions = {
    origin: "http://localhost:3000"  //frontend URL és port
}
app.use( cors(corsOptions) );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ora',termekRouter)


app.use("/filters", filtersRouter); // A frontend innen fogja lekérni az adatokat




module.exports = app;
