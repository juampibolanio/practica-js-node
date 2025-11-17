const HttpStatus = require("../utils/HttpStatus");
const BaseError = require("./BaseError");

class InsuficientEnergy extends BaseError {
    constructor(message = "La energía del alquimista es insuficiente.") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

module.exports = InsuficientEnergy;