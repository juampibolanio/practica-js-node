const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class ConflictError extends BaseError {

    constructor(message = "Error: recurso duplicado") {
        super(message, HttpStatus.CONFLICT);
    }
}

module.exports = ConflictError;