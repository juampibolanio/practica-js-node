const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = "No se encontró el recurso") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

module.exports = NotFoundError;