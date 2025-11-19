const service = require("../services/guardian.service");
const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

exports.getAllGuardians = async (req, res, next) => {
    try {
        const data = await service.getAll();
        return Response.success(res, data, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createGuardian = async (req, res, next) => {
    try {
        const createdGuardian = await service.createGuardian(req.body);
        return Response.success(res, createdGuardian, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

exports.updateItems = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedGuardianItems = await service.updateItems(id, req.body);
        return Response.success(res, updatedGuardianItems, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.updateEnergy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedGuardianEnergy = await service.updateEnergy(id, req.body);
        return Response.success(res, updatedGuardianEnergy, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.deleteGuardian = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedGuardian = await service.deleteGuardian(id);
        return Response.success(res, deletedGuardian, HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}