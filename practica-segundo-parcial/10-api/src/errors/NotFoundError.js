const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = "Resource not found", status = HttpStatus.NOT_FOUND) {
        super(message, status);
    }
}

module.exports = NotFoundError;