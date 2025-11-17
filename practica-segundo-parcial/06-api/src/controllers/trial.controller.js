const service = require("../services/trial.service");
const HttpStatus = require("../utils/HttpStatus");

exports.getAll = async (req, res, next) => {
    try {
        const trials = await service.getAll();
        res.status(HttpStatus.OK).json(trials);
    } catch (error) {
        next(error);
    }
}

exports.createTrial = async (req, res, next) => {
    try {
        const createdTrial = await service.createTrial(req.body);
        res.status(HttpStatus.CREATED).json(createdTrial);
    } catch (error) {
        next(error);
    }
}

exports.attemptTrial = async (req, res, next) => {
    try {
        const alchemistId = req.params.alchemistId;
        const trialId = req.params.trialId;
        const attemptTrial = await service.attemptTrial(alchemistId, trialId);
        res.status(HttpStatus.OK).json(attemptTrial);
    } catch (error) {
        next(error);
    }
}

exports.getAllAttempts = async (req, res, next) => {
    try {
        const attemps = await service.getAllAttempts();
        res.status(HttpStatus.OK).json(attemps);
    } catch (error) {
        next(error);
    }
}