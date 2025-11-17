const HttpStatus = require("../../../03-api/src/utils/HttpStatusCodes");

function globalErrorHandler(err, req, res, next) {
    console.error(err)
    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err});
    }

    if (err.status) {
        return res.status(err.status).json({ error: err});
    }

    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "Error. El JSON es inválido o tiene errores de sintaxis."});
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Hubo un error interno del servidor", err })
}

module.exports = globalErrorHandler;