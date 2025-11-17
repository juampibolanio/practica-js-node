const HttpStatusCodes = require("../utils/HttpStatusCodes");
const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
    constructor(message = "Error. No tienes autorización para realizar esta acción.") {
        super(message, HttpStatusCodes.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;