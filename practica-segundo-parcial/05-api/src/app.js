const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const automataRoutes = require("./routes/automata.routes");

const app = express();
app.use(express.json());

// aca van las rutas
app.use("/automatons", automataRoutes);

app.use(globalErrorHandler);


module.exports = app;