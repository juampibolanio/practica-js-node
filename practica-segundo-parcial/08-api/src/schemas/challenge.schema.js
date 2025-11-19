const Joi = require("joi");

const createChallengeSchema = Joi.object({
    title: Joi.string().required(),
    difficulty: Joi.number().min(1).max(10).required(),
    energyCost: Joi.number().min(0).max(100).required(),
    rewardFormula: Joi.string().required(),
    requiredSkill: Joi.string()
})

module.exports = createChallengeSchema;