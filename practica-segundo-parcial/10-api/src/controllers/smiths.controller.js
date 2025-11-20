const service = require("../services/smiths.services");
const Response = require("../utils/response");
const HttpStatus = require("../utils/HttpStatus");

exports.getAllSmiths = async (req, res, next) => {
    try {
        const smiths = await service.getAll();
        return Response.success(res, smiths, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createSmith = async (req, res, next) => {
    try {
        const createdSmith = await service.createSmith(req.body);
        return Response.success(res, createdSmith, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

exports.updateEnergy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedSmith = await service.updateEnergy(id, req.body);
        return Response.success(res, updatedSmith, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.updateCrystals = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedSmith = await service.updateCrystals(id, req.body);
        return Response.success(res, updatedSmith, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.removeSmith = async (req, res, next ) => {
    try {
        const id = req.params.id;
        const deletedSmith = await service.removeSmith(id);
        return Response.success(res, deletedSmith, HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}
