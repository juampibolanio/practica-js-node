const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const warriorsRouter = require("./routes/warriors.routes");
const trialsRouter = require("./routes/trials.routes");
const duelsRouter = require("./routes/duels.routes");

const app = express();
app.use(express.json());

// rutas
app.use("/warriors", warriorsRouter);
app.use("/trials", trialsRouter);
app.use("/duels", duelsRouter);

// manejador de errores
app.use(globalErrorHandler);

module.exports = app;