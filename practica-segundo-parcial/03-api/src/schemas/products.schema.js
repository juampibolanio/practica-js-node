const Joi = require("joi");

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().min(1).integer().required(),
    stock: Joi.number().positive().integer().required()
})

const updateProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().min(1).integer().required(),
    stock: Joi.number().positive().integer().required()
})

const patchProductSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().positive().min(1).integer(),
    stock: Joi.number().positive().integer()
}).min(1);

module.exports = { createProductSchema, updateProductSchema, patchProductSchema }