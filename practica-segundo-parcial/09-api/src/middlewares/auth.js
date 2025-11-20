const HttpStatus = require("../utils/HttpStatus");

function auth(req, res, next) {
    const VALID_TOKEN = "asdasdas-34234234-asdasda";

    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: `Token not found in your request`});
    }

    const token = authHeaders.replace("Bearer ", "");

    if (token !== VALID_TOKEN) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: `No permissions for realize this action`});
    }

    next();
}

module.exports = auth;