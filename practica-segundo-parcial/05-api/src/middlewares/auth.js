const HttpStatus = require("../utils/HttpStatus");

function auth(req, res, next) {
    const APP_TOKEN = "asdasd-3235-asdas-454545";

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: "No se encontró token para autorizar esta solicitud"});
    }

    const token = authHeader.replace("Bearer ", "");

    if (token !== APP_TOKEN) {
        return res.json(HttpStatus.UNAUTHORIZED).json({ error: "No tienes permisos suficientes"});
    }

    next()
}

module.exports = auth;