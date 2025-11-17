const HttpStatus = require("../utils/HttpStatus");

function globalErrorHandler(err, req, res, next) {
    console.log("Ha ocurrido un error" + err);
    
    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err});
    }

    if (err.status) {
        return res.status(err.status).json({ error: err})
    }

    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "Error de sintaxis o formato de JSON"})
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: `Ha ocurrido un error en el servidor ${err}`});
}

module.exports = globalErrorHandler;