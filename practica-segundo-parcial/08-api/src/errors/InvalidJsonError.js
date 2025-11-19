const BaseError = require("./BaseError");
const HttpStatus = require("../utils/HttpStatus");

class InvalidJsonError extends BaseError {
    constructor(message = "Error: Invalid JSON format.") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InvalidJsonError;