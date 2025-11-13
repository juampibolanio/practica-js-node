class BaseError extends Error {
    constructor(message = "Ha ocurrido un error", status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

module.exports = BaseError;