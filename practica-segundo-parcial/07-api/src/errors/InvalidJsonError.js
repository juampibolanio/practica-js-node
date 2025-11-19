const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class InvalidJsonError extends BaseError {
    constructor(message = "El formato del JSON es inválido o está corrupto.") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InvalidJsonError;