const HttpStatus = require("../utils/HttpStatus");

class BaseError extends Error {
    constructor(message = "A error ocurred", status = HttpStatus.BAD_REQUEST) {
        super(message);
        this.status = status,
        this.name = this.constructor.name;
    }
}

module.exports = BaseError;