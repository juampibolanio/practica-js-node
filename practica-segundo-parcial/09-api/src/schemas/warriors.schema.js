const Joi = require("joi");

const createWarriorSchema = Joi.object({
    name: Joi.string().required(),
    affinities: Joi.array().items(Joi.string()).required(),
    artifacts: Joi.array().items(Joi.object({
        name: Joi.string(),
        power: Joi.number().integer()
    }))
})

const updateEnergySchema = Joi.object({
    energy: Joi.number().integer().max(120).required()
})

const updateArtifactsSchema = Joi.object({
    action: Joi.string().required(),
    artifacts: Joi.array().items(Joi.object({
        name: Joi.string(),
        power: Joi.number().integer()
    })),
    artifactName: Joi.string()
})

module.exports = { createWarriorSchema, updateArtifactsSchema, updateEnergySchema }