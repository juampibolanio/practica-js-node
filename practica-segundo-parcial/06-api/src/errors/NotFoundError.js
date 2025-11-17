const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = "El recurso no fue encontrado") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

module.exports = NotFoundError;