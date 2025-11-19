const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
    constructor(message = "No authorized") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;