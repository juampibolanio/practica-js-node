const HttpStatus = require("../utils/HttpStatus");

function validate(schema) {
    return (req, res, next) => {
        
        const { error, value } = schema.validate(req.body);

        if (error) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: `Error de validación: ${error.message}`});
        }
        req.body = value;
        next();
    }
}

module.exports = validate;