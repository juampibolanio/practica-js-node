const Joi = require("joi");

const createBookingSchema = Joi.object({
    clientName: Joi.string().min(3).required(),
    date: Joi.string().isoDate().required(),
    time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    field: Joi.number().min(1).max(5).required(),
});

const updateBookingSchema = Joi.object({
    clientName: Joi.string().min(3).required(),
    date: Joi.string().isoDate().required(),
    time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    field: Joi.number().min(1).max(5).required(),
});

const patchBookingSchema = Joi.object({
    clientName: Joi.string().min(3),
    date: Joi.string().isoDate(),
    time: Joi.string().pattern(/^\d{2}:\d{2}$/),
    field: Joi.number().min(1).max(5),
}).min(1);

module.exports = { createBookingSchema, updateBookingSchema, patchBookingSchema }