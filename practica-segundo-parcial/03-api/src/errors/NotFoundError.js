const BaseError = require("./BaseError");
const HttpStatus = require("../utils/HttpStatusCodes")

class NotFoundError extends BaseError {
    constructor(message = "Error. El recurso no fue encontrado.") {
        super(message, HttpStatus.NOT_FOUND);
    }
}

module.exports = NotFoundError;