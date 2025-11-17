const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class InvalidJsonError extends BaseError {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InvalidJsonError;