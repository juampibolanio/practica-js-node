const service = require("../services/engineer.service");
const HttpStatus = require("../utils/HttpStatus");

exports.getAllEngineers = async (req, res, next) => {
    try {
        const engineers = await service.getAll();
        res.status(HttpStatus.OK).json(engineers);
    } catch (error) {
        next(error);
    }
}

exports.createEngineer = async (req, res, next) => {
    try {
        const createdEngineer = await service.createEngineer(req.body);
        res.status(HttpStatus.CREATED).json(createdEngineer);
    } catch (error) {
        next(error);
    }
}

exports.updateXp = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedEngineer = await service.updateXp(id, req.body);
        res.status(HttpStatus.OK).json(updatedEngineer);
    } catch (error) {
        next(error);
    }
}