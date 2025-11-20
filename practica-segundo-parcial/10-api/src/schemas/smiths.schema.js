const Joi = require("joi");

const createSmithSchema = Joi.object({
    name: Joi.string().required(),
    runes: Joi.array().items(Joi.string()),
    crystals: Joi.array().items(Joi.object({
        name: Joi.string(),
        power: Joi.number().integer().min(1)
    }))
})

const updateEnergySchema = Joi.object({
    energy: Joi.number().min(1).max(100).required()
})

const updateCrystalsSchema = Joi.object({
    action: Joi.string().required(),
    crystals: Joi.array().items(Joi.object({
        name: Joi.string(),
        power: Joi.number().integer().min(1)
    })),
    crystalName: Joi.string()
})

module.exports = { createSmithSchema, updateEnergySchema, updateCrystalsSchema }