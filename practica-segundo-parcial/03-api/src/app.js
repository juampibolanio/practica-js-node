const express = require("express");
const GlobalErrorHandler = require("./middlewares/globalErrorHandler");
const products = require("./routes/products.routes");
const cart = require("./routes/cart.routes");
const order = require("./routes/orders.routes");

const app = express();

app.use(express.json());

app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/orders", order);

app.use(GlobalErrorHandler);

module.exports = app;