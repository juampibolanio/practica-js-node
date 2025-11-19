const Joi = require("joi");

const createGuardianSchema = Joi.object({
    name: Joi.string().required(),
    skills: Joi.array().items(Joi.string()),
    items: Joi.array().items(Joi.object({
        name: Joi.string(),
        power: Joi.number()
    }))
})

const updateEnergySchema = Joi.object({
    energy: Joi.number().required()
})

const updateItemsSchema = Joi.object({
    action: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        name: Joi.string(),
        power: Joi.number(),
    })),
    itemName: Joi.string()
})

module.exports = { createGuardianSchema, updateEnergySchema, updateItemsSchema };