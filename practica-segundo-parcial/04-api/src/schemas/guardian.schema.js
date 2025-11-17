const Joi = require("joi");

const createGuardianSchema = Joi.object({
    name: Joi.string().min(3).required(),
    skills: Joi.array().items(Joi.string()).required(),
    items: Joi.array().items(Joi.object({
        name: Joi.string().min(3).required(),
        power: Joi.number().integer().min(1).max(100).required(),
    }).required()).required()
});

const updateGuardianItemsSchema = Joi.object({
    action: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        name: Joi.string().min(3),
        power: Joi.number().integer().min(1).max(100),
    }).required()).required(),
    itemName: Joi.string()
})


const patchGuardianSchema = Joi.object({
    name: Joi.string().min(3),
    skills: Joi.array().items(Joi.string()),
    energy: Joi.number().integer().min(0).max(100),
    items: Joi.array().items(Joi.object({
        name: Joi.string().min(3),
        power: Joi.number().integer().min(1).max(100),
    }))
}).min(1);

module.exports = { createGuardianSchema, updateGuardianItemsSchema, patchGuardianSchema }