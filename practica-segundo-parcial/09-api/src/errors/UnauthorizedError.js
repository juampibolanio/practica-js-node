const BaseError = require("../errors/BaseError");
const HttpStatus = require("../utils/HttpStatus");

class UnauthorizedError extends BaseError {
    constructor(message = "Don´t have permissions to realize this action") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;