const Joi = require("joi");

const createRobotSchema = Joi.object({
    model: Joi.string().required(),
    powerBase: Joi.number().min(10).max(40).required(),
    components: Joi.array().items(Joi.object({
        name: Joi.string(),
        boost: Joi.number()
    })).required(),

})

const updateComponentsSchema = Joi.object({
    action: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        name: Joi.string(),
        boost: Joi.number()
    }))
})

module.exports = { createRobotSchema, updateComponentsSchema };