const HttpStatus = require("../utils/HttpStatusCodes");
const BaseError = require("./BaseError");

class InsuficientStockError extends BaseError {
    constructor(message = "Error. El stock del producto es insuficiente.") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InsuficientStockError;