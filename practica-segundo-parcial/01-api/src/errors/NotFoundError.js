const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class NotFoundError extends BaseError {
    constructor(message = "Error: el recurso no fue encontrado") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

module.exports = NotFoundError;