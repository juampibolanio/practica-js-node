const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class InvalidJsonError extends BaseError {
    constructor(message = "Error de JSON: formato inválido o error de sintaxis") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
module.exports = InvalidJsonError;