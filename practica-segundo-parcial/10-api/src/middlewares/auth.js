const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

function auth(req, res, next) {

    const VALID_TOKEN = "asdasdas-42425345-asdasdasd";

    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return Response.failed(res, "Token not found", HttpStatus.UNAUTHORIZED);
    }

    const token = authHeaders.replace("Bearer ", "");

    if (token !== VALID_TOKEN) {
        return Response.failed(res, "No authorization", HttpStatus.UNAUTHORIZED);
    }

    next();
}

module.exports = auth;