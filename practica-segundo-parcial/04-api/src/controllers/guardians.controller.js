const HttpStatus = require("../utils/HttpStatusCodes");
const service = require("../services/guardians.service");

exports.getAllGuardian = async (req, res, next) => {
    try {
        const guardians = await service.getAllGuardian();
        res.status(HttpStatus.OK).json(guardians);
    } catch (error) {
        next(error);
    }
}

exports.createGuardian = async (req, res, next) => {
    try {
        const newGuardian = await service.createGuardian(req.body);

        res.status(HttpStatus.CREATED).json(newGuardian);
    } catch (error) {
        next(error);
    }
}

exports.updateGuardianItems = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedGuardian = await service.updateGuardianItems(id, req.body);
        res.status(HttpStatus.OK).json(updatedGuardian);
    } catch (error) {
        next(error);
    }
}

exports.updateGuardianEnergy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedGuardian = await service.updateEnergyGuardian(id, req.body);
        res.status(HttpStatus.OK).json(updatedGuardian);
    } catch (error) {
        next(error);
    }
}

exports.patchGuardian = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedGuardian = await service.patchGuardian(id, req.body);
        res.status(HttpStatus.OK).json(updatedGuardian);
    } catch (error) {
        next(error);
    }
}

exports.removeGuardian = async (req, res, next) => {
    try {
        const id = req.params.id;
        const guardianRemoved = await service.removeGuardian(id);
        res.status(HttpStatus.NO_CONTENT).json(guardianRemoved);
    } catch (error) {
        next(error);
    }
}

exports.upLevel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const guardian = await service.upLevel(id);
        res.status(HttpStatus.OK).json(guardian);
    } catch (error) {
        next(error);
    }
}
