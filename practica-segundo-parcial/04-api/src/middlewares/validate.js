const HttpStatus = require("../utils/HttpStatusCodes");

function validate(schema) {
    return (req, res, next) => {

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
        req.body = value;
        next();
    }
}

module.exports = validate;