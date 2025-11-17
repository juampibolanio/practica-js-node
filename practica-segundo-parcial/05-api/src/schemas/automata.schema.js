const Joi = require("joi");

const createAutomataSchema = Joi.object({
    modelName: Joi.string().required(),
    components: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        efficiency: Joi.number().required()
    })).required(),
    protocols: Joi.array().items(Joi.string().required()).required()
})

const patchAutomataSchema = Joi.object({
    modelName: Joi.string(),
    components: Joi.array().items(Joi.object({
        name: Joi.string(),
        efficiency: Joi.string()
    })),
    protocols: Joi.array().items(Joi.string())
})

const updateAutomataEnergy = Joi.object({
    energy: Joi.number().min(1).max(100),
})

const updateAutomataComponents = Joi.object({
    action: Joi.string().required(),
    componentName: Joi.string(),
    components: Joi.array().items(Joi.object())
})

module.exports = { createAutomataSchema, patchAutomataSchema, updateAutomataComponents, updateAutomataEnergy }