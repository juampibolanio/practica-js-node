const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class ForbiddenError extends BaseError {
    constructor(message = "Error: no tienes permisos para realizar esta acción.") {
        super(message, HttpStatus.FORBIDDEN);
    }
}

module.exports = ForbiddenError;