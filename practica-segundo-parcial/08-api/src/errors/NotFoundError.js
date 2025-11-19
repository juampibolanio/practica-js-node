const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = "Resource not found") {
        super(message, HttpStatus.NO_CONTENT);
    }
}

module.exports = NotFoundError;