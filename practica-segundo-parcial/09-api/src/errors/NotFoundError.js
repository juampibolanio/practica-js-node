const BaseError = require("../errors/BaseError");
const HttpStatus = require("../utils/HttpStatus");

class NotFoundError extends BaseError {
    constructor(message = "Resource not found") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

module.exports = NotFoundError;