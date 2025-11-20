const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("../errors/BaseError");

class UnauthorizedError extends BaseError {
    constructor(message = "No authorizated", status = HttpStatus.UNAUTHORIZED) {
        super(message, status);
    }
}

module.exports = UnauthorizedError;