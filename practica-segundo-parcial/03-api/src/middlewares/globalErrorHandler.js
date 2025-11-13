const HttpStatus = require("../utils/HttpStatusCodes");

function globalErrorHandler (err, req, res, next) {
    console.error(err);

    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }

    if (err.status) {
        return res.status(err.status).json({ error: err.message});
    }

    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "Error de sintaxis en el JSON"});
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Ha ocurrido un error interno del servidor"});
}

module.exports = globalErrorHandler;