const Response = require("../utils/response");
const HttpStatus = require("../utils/HttpStatus");

function validate(schema) {
    return (req, res, next) => {

        const { error, value } = schema.validate(req.body);

        if (error) {
            return Response.failed(res, `Validate error: ${error}`, HttpStatus.BAD_REQUEST);
        }

        req.body = value;
        next();
    }
}

module.exports = validate;