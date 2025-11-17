const HttpStatus = require("../utils/HttpStatus");

function auth(req, res, next) {
    const VALID_TOKEN = "asdasd-343434-asdasdasd-4545454";

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: "No se envió el token en la solicitud"});
    }

    const token = authHeader.replace("Bearer ", "")

    if (token !== VALID_TOKEN) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: "No tienes autorización para realizar esto."});
    }

    next();
}

module.exports = auth;