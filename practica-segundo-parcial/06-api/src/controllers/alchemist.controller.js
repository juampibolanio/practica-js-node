const service = require("../services/alchemist.service");
const HttpStatus = require("../utils/HttpStatus");

exports.getAll = async (req, res, next) => {
    try {
        const data = await service.getAll();
        res.status(HttpStatus.OK).json(data);
    } catch (error) {
        next(error);
    }
}

exports.createAlchemist = async (req, res, next) => {
    try {
        const createdAlchemist = await service.createAlchemist(req.body);
        res.status(HttpStatus.CREATED).json(createdAlchemist);
    } catch (error) {
        next(error);
    }
}

exports.updateEnergy = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedAlchemist = await service.updateEnergy(id, req.body);
        res.status(HttpStatus.OK).json(updatedAlchemist);
    } catch (error) {
        next(error);
    }
}

exports.updateCatalysts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedAlchemist = await service.updateCatalysts(id, req.body);
        res.status(HttpStatus.OK).json(updatedAlchemist);
    } catch (error) {
        next(error);
    }
}

exports.upLevel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await service.upLevel(id);
        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        next(error);
    }
}
