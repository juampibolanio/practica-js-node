const service = require("../services/trial.service");
const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

exports.getAllTrials = async (req, res, next) => {
    try {
        const data = await service.getAll();
        return Response.success(res, data, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createTrial = async (req, res, next) => {
    try {
        const createdTrial = await service.createTrial(req.body);
        return Response.success(res, createdTrial, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

exports.attemptTrial = async (req, res, next) => {
    try {
        const idWarrior = req.params.idWarrior;
        const idTrial = req.params.idTrial;
        const attemptResult = await service.attemptTrial(idTrial, idWarrior);
        return Response.success(res, attemptResult, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}