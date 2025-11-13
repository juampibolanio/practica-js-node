const Joi = require ("joi");

const addToCardSchema = Joi.object({
    id: Joi.string().required(),
    qty: Joi.number().positive().integer().min(1).required()
});

module.exports = { addToCardSchema };