const Joi = require("joi");

const createDuelSchema = Joi.object({
    idGuardianA: Joi.string().required(),
    idGuardianB: Joi.string().required()
})

module.exports = createDuelSchema;