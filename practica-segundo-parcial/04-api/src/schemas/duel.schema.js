const Joi = require("joi");

const createDuelSchema = Joi.object({
    guardianIdA: Joi.string().required(),
    guardianIdB: Joi.string().required()
})

module.exports = { createDuelSchema }