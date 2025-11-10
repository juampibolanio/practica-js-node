const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class InternalServerError extends BaseError {
    constructor(message = "Error interno del servidor.") {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = InternalServerError;