const HttpStatus = require("../utils/HttpStatus");

class BaseError extends Error {
    constructor(message = "Ha ocurrido un error", status = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status;
        this.name = this.constructor.name
    }
}

module.exports = BaseError