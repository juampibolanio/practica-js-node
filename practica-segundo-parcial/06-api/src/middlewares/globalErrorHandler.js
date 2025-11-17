const HttpStatus = require("../utils/HttpStatus");

function globalErrorHandler(err, req, res, next) {
    console.error(err);

    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err})
    }

    if (err.status) {
        return res.status(err.status).json({ error: err});
    }

    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "El archivo Json es inválido o está mal formateado"});
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: `Error interno del servidor: ${err}`});
}

module.exports = globalErrorHandler;