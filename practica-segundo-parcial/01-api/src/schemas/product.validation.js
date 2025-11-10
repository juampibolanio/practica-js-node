const Joi = require("joi");

const createProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
});

const updateProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
});

const patchProductSchema =  Joi.object({
    name: Joi.string().min(3),
    price: Joi.number().min(0),
}).min(1);

module.exports = { createProductSchema, updateProductSchema, patchProductSchema };