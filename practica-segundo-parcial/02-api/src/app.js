const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const booking_routes = require("./routes/bookings.routes");

const app = express();

app.use(express.json());

app.use("/api/bookings", booking_routes);

app.use(errorHandler);

module.exports = app;