const BaseError = require("./BaseError");
const HttpStatus = require("../utils/HttpStatusCodes");

class ConflictError extends BaseError {
    constructor(message = "Error. El recurso está duplicado o en conflicto con otro.") {
        super(message, HttpStatus.CONFLICT);
    }
}

module.exports = ConflictError;