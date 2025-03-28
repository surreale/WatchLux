const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const termekRouter = require("./routes/termek");
const filtersRouter = require("./routes/filters");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order"); 

const app = express();


const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));


app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ora", termekRouter);
app.use("/filters", filtersRouter);
app.use("/auth", authRouter);
app.use("/order", orderRouter); 

module.exports = app;
