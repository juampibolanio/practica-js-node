const HttpStatus = require("../utils/HttpStatus");

function globalErrorHandler(err, req, res, next) {
    console.error(err);

    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: `Has a validate error: ${err}` });
    }
    
    if (err.status) {
        return res.status(err.status).json({ error: err});
    }

    if (err instanceof SyntaxError) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: `Error: Invalid JSON format or file corrupted`});
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: `Internal server error: ${err}`});
}

module.exports = globalErrorHandler;