const service = require("../services/product.service");

exports.getAll = (req, res, next) => {
    try {
        const products = service.getAll();
        res.json(products);

    } catch (err) {
        next(err);
    }
};

exports.getById = (req, res, next) => {
    try {
        const id = req.params.id;
        const product = service.getById(id);
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.create = (req, res, next) => {
    try {
        const product = service.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
}

exports.update = (req, res, next) => {
    try {
        const id = req.params.id;
        const product = service.update(id, req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

exports.patch = (req, res, next) => {
    try {
        const id = req.params.id;
        const product = service.patch(id, req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

exports.remove = (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = service.remove(id);
        res.json(deleted);
    } catch (err) {
        next(err);
    }
}