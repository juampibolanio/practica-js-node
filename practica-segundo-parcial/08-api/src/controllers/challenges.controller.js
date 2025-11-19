const service = require("../services/challenges.service");
const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

exports.getAllChallenges = async (req, res, next) => {
    try {
        const data = await service.getAll();
        return Response.success(res, data, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createChallenge = async (req, res, next) => {
    try {
        const createdChallenge = await service.createChallenge(req.body);
        return Response.success(res, createdChallenge, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

exports.attemptChallenge = async (req, res, next) => {
    try {
        const idChallenge = req.params.idChallenge;
        const idGuardian = req.params.idGuardian;
        const result = await service.attemptChallenge(idChallenge, idGuardian);
        return Response.success(res, result, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.removeChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const removed = await service.deleteChallenge(id);
        return Response.success(res, removed, HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}
