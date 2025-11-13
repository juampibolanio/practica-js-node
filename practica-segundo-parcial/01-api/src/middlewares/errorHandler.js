const HttpStatus = require("../utils/httpStatusCodes");

function errorHandler(err, req, res, next) {
    console.error(err);

    // acá irian los errores relacionados con JOI
    if (err.isJoi) { 
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }

    // acá irían los errores personalizados
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }

    // acá estan los errores de json invalido
    if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: "Error: El JSON tiene errores de formateo."
        });
    }

    // Cualquier otro error.
    return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json( {error: "Hubo  un error interno del servidor. "});
    
}

module.exports = errorHandler;