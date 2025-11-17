const express = require("express");
const GlobalErrorHandler = require("./middlewares/globalErrorHandler");
const guardiansRouter = require("./routes/guardians.routes");
const challengesRouter = require("./routes/challenges.routes");
const duelsRouter = require("./routes/duels.routes");

const app = express();
app.use(express.json());

// rutas 
app.use("/guardians", guardiansRouter);
app.use("/challenges", challengesRouter);
app.use("/duels", duelsRouter);

app.use(GlobalErrorHandler);

module.exports = app;