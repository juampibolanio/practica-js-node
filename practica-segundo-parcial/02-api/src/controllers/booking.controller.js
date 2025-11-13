const bookingService = require("../services/booking.service");
const HttpStatusCodes = require("../utils/httpStatusCodes");

exports.getAll = (req, res, next) => {
    try {
        const bookings = bookingService.getAll();
        res.json(bookings);

    } catch (error) {
        next(error);
    }
}

exports.getById = (req, res, next) => {
    try {
        const id = req.params.id;

        const booking = bookingService.getById(id);
        res.json(booking);
    } catch (error) {
        next(error);
    }
}

exports.create = (req, res, next) => {
    try {
        const booking = bookingService.create(req.body);
        res.status(HttpStatusCodes.CREATED).json(booking);
    } catch (error) {
        next(error);
    }
}

exports.update = (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedBooking = bookingService.update(id, req.body);
        res.json(updatedBooking);
    } catch (error) {
        next(error);
    }
}

exports.patch = (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedBooking = bookingService.patch(id, req.body);
        res.json(updatedBooking);
    } catch (error) {
        next(error);
    }
}

exports.remove = (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBooking = bookingService.remove(id);
        res.status(HttpStatusCodes.NO_CONTENT).json(deletedBooking);
    } catch (error) {
        next(error);
    }
}