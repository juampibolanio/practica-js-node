const Joi = require("joi");

const createChallengeSchema = Joi.object({
    title: Joi.string().min(3).required(),
    difficulty: Joi.number().integer().min(1).max(10).required(),
    energyCost: Joi.number().min(1).max(100).required(),
    rewardFormula: Joi.string().required(),
    requiredSkill: Joi.string().required(),
})

const patchChallengeSchema = Joi.object({
    title: Joi.string().min(3).required(),
    difficulty: Joi.number().integer().min(1).max(10).required(),
    energyCost: Joi.number().min(1).max(100).required(),
    rewardFormula: Joi.string().required(),
    requiredSkill: Joi.string().required(),
}).min(1);

const attemptChallengeSchema = Joi.object({
    challengeId: Joi.string().required(),
    guardianId: Joi.string().required(),
})

module.exports = { createChallengeSchema, patchChallengeSchema, attemptChallengeSchema }