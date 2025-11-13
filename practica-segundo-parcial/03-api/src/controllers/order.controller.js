const service = require("../services/orders.service");
const HttpStatus = require("../utils/HttpStatusCodes");

exports.getAll = (req, res, next) => {
    try {
        const orders = service.getAll();
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

exports.getById = (req, res, next) => {
    try {
        let id = req.params.id;
        let order = service.getById(id);
        res.json(order);
    } catch (error) {
        next(error);
    }
}

exports.create = (req, res, next) => {
    try {
        let createdOrder = service.create(req.body);
        res.status(HttpStatus.CREATED).json(createdOrder);
    } catch (error) {
        next(error);
    }
}

exports.cancelOrder = (req, res, next) => {
    try {
        let id = req.params.id;
        let cancelledOrder = service.cancelOrder(id);
        res.status(HttpStatus.OK).json(cancelledOrder);
    } catch (error) {
        next(error);
    }
}

exports.payOrder = (req, res, next) => {
    try {
        let id = req.params.id;
        let paidOrder = service.payOrder(id);
        res.status(HttpStatus.OK).json(paidOrder);
    } catch (error) {
        next(error);
    }
}
