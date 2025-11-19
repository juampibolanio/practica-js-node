const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
    constructor(message = "No tienes permisos para realizar esta acción.") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;