const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const smithRouter = require("./routes/smiths.routes");

const app = express();
app.use(express.json());

// rutas
app.use("/smiths", smithRouter);

// error global handler
app.use(globalErrorHandler);

module.exports = app;