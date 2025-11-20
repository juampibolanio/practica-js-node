const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

function globalErrorHandler(err, req, res, next) {
    console.log(err);

    if (err.isJoi) {
        return Response.failed(res, `Validation error: ${err.message}`, HttpStatus.BAD_REQUEST);
    }

    if (err.status) {
        return Response.failed(res, `A error ocurred: ${err.message}`, HttpStatus.BAD_REQUEST);
    }

    if (err instanceof SyntaxError) {
        return Response.failed(res, `Syntax JSON error: ${err.message}`, HttpStatus.BAD_REQUEST);
    }

    return Response.failed(res, `Server error: ${err.message}`, HttpStatus.INTERVAL_SERVER_ERROR);
    
}

module.exports = globalErrorHandler;