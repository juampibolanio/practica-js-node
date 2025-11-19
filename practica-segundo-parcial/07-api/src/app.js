const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const engineersRoutes = require("./routes/engineer.routes");
const robotsRoutes = require("./routes/robot.routes");

const app = express();
app.use(express.json());

// acá irian las rutas de los modulos
app.use("/engineers", engineersRoutes);
app.use("/robots", robotsRoutes);

app.use(globalErrorHandler);

module.exports = app;