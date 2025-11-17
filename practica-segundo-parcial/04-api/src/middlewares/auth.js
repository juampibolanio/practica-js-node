const HttpStatus = require("../utils/HttpStatusCodes");

function auth(req, res, next) {
    const VALID_TOKEN = "asda-3443-2fsdf-fef3-4343-sds";

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: "Token requerido"} );
    }

    const token = authHeader.replace("Bearer ", "");

    if (token !== VALID_TOKEN) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: "El token enviado es inválido. "});
    }

    next();
}

module.exports = auth;