const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

// acá irían todas las rutas de la api.
app.use("/api/products", productRoutes);

// esto seria el manejo global de errores
app.use(errorHandler);

module.exports = app;