const HttpStatus = require("../utils/httpStatusCodes");

function errorHandler(err, req, res, next) {
    console.error(err);
    
    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message});
    }

    if (err.status) {
        return res.status(err.status).json({ error: err.message })
    }

    if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "El JSON tiene errores de sintaxis o formato."});
    }

    return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Hubo un error interno del servidor."});
}

module.exports = errorHandler;