const HttpStatus = require("../utils/HttpStatus");

function globalErrorHandler(err, req, res, next) {
    console.error(err);

    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: `Validation error: ${err}`});
    }

    if (err.status) {
        return res.status(err.status).json({ error: err});
    }

    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: `JSON sintax error ${err}`});
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err});
    
}

module.exports = globalErrorHandler;