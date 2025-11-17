const Joi = require("joi");

const createAlchemistSchema = Joi.object({
    name: Joi.string().required(),
    affinities: Joi.array().items(Joi.string()).required(),
    catalysts: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        potency: Joi.number().required()
    })).required()
})

const updateEnergySchema = Joi.object({
    energy: Joi.number().required()
})

const updateCatalystsSchema = Joi.object({
    action: Joi.string().required(),
    catalysts: Joi.array().items(Joi.object({
        name: Joi.string(),
        potency: Joi.number()
    })),
    catalystName: Joi.string()
})

module.exports = { createAlchemistSchema, updateCatalystsSchema, updateEnergySchema };