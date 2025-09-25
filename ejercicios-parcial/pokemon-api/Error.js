class EstadoInvalidoError extends Error{
    constructor(message) {
        super(message);
        this.name = "EstadoInvalidoError";
    }
}

module.exports = EstadoInvalidoError;