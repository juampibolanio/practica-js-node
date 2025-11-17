const BaseError = require("./BaseError");
const HttpStatus = require("../utils/HttpStatusCodes");

class InvalidJson extends BaseError {
    constructor(message = "Error. El formato del JSON es inválido" ) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InvalidJson;