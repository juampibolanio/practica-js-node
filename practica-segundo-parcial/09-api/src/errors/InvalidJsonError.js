const BaseError = require("../errors/BaseError");
const HttpStatus = require("../utils/HttpStatus");

class InvalidJsonError extends BaseError {
    constructor(message = "Error: SyntaxError in JSON file") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InvalidJsonError;