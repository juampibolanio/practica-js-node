const Joi = require("joi");

const createTrialSchema = Joi.object({
    title: Joi.string().required(),
    difficulty: Joi.number().max(12).required(),
    energyCost: Joi.number().required(),
    rewardFormula: Joi.string().required(),
    requiredAffinity: Joi.string().required()
})

module.exports = { createTrialSchema }