const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const alchemistsRouter = require("./routes/alchemist.routes");
const trialsRouter = require("./routes/trial.routes");
const duelsRouter = require("./routes/duels.routes");

const app = express();
app.use(express.json());

// rutas
app.use("/alchemists", alchemistsRouter);
app.use("/trials", trialsRouter);
app.use("/duels", duelsRouter);

app.use(globalErrorHandler);

module.exports = app;