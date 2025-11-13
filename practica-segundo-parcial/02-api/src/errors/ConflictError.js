const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class ConflictError extends BaseError {
    constructor(message = "Error: no pueden haber recursos duplicados.") {
        super(message, HttpStatus.CONFLICT);
    }
}

module.exports = ConflictError;