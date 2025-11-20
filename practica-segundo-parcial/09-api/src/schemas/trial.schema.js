const Joi = require("joi");

const createTrialSchema = Joi.object({
    title: Joi.string().required(),
    difficulty: Joi.number().integer().min(1).max(12).required(),
    energyCost: Joi.number().integer().min(1).max(120).required(),
    rewardFormula: Joi.string().required(),
    requiredAffinity: Joi.string().required()
})

module.exports = { createTrialSchema }