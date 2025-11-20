class BaseError extends Error {
    constructor(message = "A error has ocurred", status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

module.exports = BaseError;