function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return next(error); // esto lo manejaria el handler global de errores
        }

        next();
    };
}

module.exports = validate;