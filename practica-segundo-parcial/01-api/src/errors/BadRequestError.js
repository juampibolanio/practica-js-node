const BaseError = require("./BaseError");
const HttpStatus = require("../utils/httpStatusCodes");

class BadRequestError extends BaseError {
    constructor(message = "Hubo un error en la solicitud.") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = BadRequestError;