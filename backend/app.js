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

const app = express();

// 🔹 CORS engedélyezése
const corsOptions = {
    origin: "http://localhost:3000",  // A frontend URL-je
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type"
};
app.use(cors(corsOptions));

// 🔹 Middleware-ek
app.use(logger("dev"));
app.use(express.json()); // JSON adatok engedélyezése
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 🔹 API végpontok
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ora", termekRouter);
app.use("/filters", filtersRouter);

module.exports = app;
