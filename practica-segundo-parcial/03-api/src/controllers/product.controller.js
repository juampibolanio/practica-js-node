const service = require("../services/products.service");
const HttpStatus = require("../utils/HttpStatusCodes");

exports.getAll = (req, res, next) => {
    try {
        const products = service.getAll();
        
        res.status(HttpStatus.OK).json(products);
    } catch (error) {
        next(error)
    }
}

exports.getById = (req, res, next) => {
    try {
        const product = service.getById(req.params.id);
        res.status(HttpStatus.OK).json(product);
    } catch (error) {
        next(error);
    }
}

exports.create = (req, res, next) => {
    try {
        const product = service.create(req.body);
        res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
        next(error);
    }
}

exports.update = (req, res, next) => {
    try {
        const id = req.params.id;
        const productUpdated = service.update(id, req.body);
        res.status(HttpStatus.OK).json(productUpdated);
    } catch (error) {
        next(error);
    }
}

exports.patch = (req, res, next) => {
    try {
        const id = req.params.id;
        const productUpdated = service.patch(id, req.body);
        res.status(HttpStatus.OK).json(productUpdated);
    } catch (error) {
        next(error);
    }
}

exports.delete = (req, res, next) => {
    try {
        const id = req.params.id;
        const productDeleted = service.remove(id);
        res.status(HttpStatus.NO_CONTENT).json(productDeleted);
    } catch (error) {
        next(error);
    }
}