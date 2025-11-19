const HttpStatus = require("../utils/HttpStatus");

function globalErrorHandler(err, req, res, next) {

    console.error(err);

    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err});
    }

    if (err.status) {
        return res.status(err.status).json({ error: err});
    }
    
    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: `El JSON tiene un formato inválido o está corrupto`});
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: `Ha ocurrido un error interno del servidor ${err}`});
}

module.exports = globalErrorHandler;