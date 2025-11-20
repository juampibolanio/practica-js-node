const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class JsonInvalidError extends BaseError {
    constructor(message = "Invalid JSON format or Syntax Error", status = HttpStatus.BAD_REQUEST) {
        super(message, status);
    }
}

module.exports = JsonInvalidError;