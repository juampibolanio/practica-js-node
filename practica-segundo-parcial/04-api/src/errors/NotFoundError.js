const HttpStatusCodes = require("../utils/HttpStatusCodes");
const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = "Error. El recurso no existe o no fue encontrado") {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
}

module.exports = NotFoundError;