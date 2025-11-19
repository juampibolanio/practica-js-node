const HttpStatus = require("../../../06-api/src/utils/HttpStatus");

function auth(req, res, next) {

    const APP_TOKEN = "asfgdfgdfg-23235345-asdasfasf";

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: `Se requiere un token de autorización`});
    }

    const token = authHeader.replace("Bearer ", "");

    if (token !== APP_TOKEN) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: `No estás autorizado para realizar esto.`});
    }

    next();
}

module.exports = auth;
