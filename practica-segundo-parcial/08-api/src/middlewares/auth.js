const HttpStatus = require("../utils/HttpStatus");

function auth(req, res, next) {
    const VALID_TOKEN = "dasdasdas-4234234-asdadas";

    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: `The request not have a token`});
    }

    const token = authHeaders.replace("Bearer ", "");

    if (token !== VALID_TOKEN) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: `You don´t have permissions.`});
    }

    next();
}

module.exports = auth;