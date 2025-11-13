const BaseError = require("./BaseError");
const HttpStatus = require("../utils/HttpStatusCodes");

class UnauthorizedError extends BaseError {
    constructor(message = "Error. No tienes permisos para realizar esta acción") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;