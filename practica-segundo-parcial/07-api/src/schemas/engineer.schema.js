const Joi = require("joi");

const createEngineerSchema = Joi.object({
    name: Joi.string().required(),
    skillset: Joi.array().items(Joi.string()).required(),
    robots: Joi.array().items(Joi.string())
})

const updateXpSchema = Joi.object({
    xp: Joi.number().required()
})

module.exports = { createEngineerSchema, updateXpSchema };