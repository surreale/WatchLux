const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Route-ok
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const termekRouter = require("./routes/termek");
const filtersRouter = require("./routes/filters");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order"); // ✅ ÚJ

const app = express();

// 🔹 CORS engedélyezése
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));

// 🔹 Middleware-ek
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 🔹 API végpontok
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ora", termekRouter);
app.use("/filters", filtersRouter);
app.use("/auth", authRouter);
app.use("/order", orderRouter); // ✅ ÚJ VÉGPONT

module.exports = app;
