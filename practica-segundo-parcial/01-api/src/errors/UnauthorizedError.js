const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class UnauthorizedError extends BaseError {
    constructor(message = "Error de autorización.") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;