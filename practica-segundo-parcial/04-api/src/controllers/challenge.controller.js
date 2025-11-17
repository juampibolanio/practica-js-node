const service = require ("../services/challenge.service");
const HttpStatus = require("../utils/HttpStatusCodes");

exports.getAllChallenges = async (req, res, next) => {
    try {
        const challenges = await service.getAllChallenges();
        res.status(HttpStatus.OK).json(challenges);
    } catch (error) {
        next(error);
    }
}

exports.createChallenge = async (req, res, next) => {
    try {
        const createdChallenge = await service.createChallenge(req.body);
        res.status(HttpStatus.CREATED).json(createdChallenge);
    } catch (error) {
        next(error);
    }
}

exports.patchChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedChallenge = await service.patchChallenge(id, req.body);
        res.status(HttpStatus.OK).json(updatedChallenge);
    } catch (error) {
        next(error);
    }
}

exports.attemptChallenge = async (req, res, next) => {
    try {
        const idChallenge = req.params.challengeId;
        const idGuardian = req.params.guardianId;

        const challengeResult = await service.attemptChallenge(idChallenge, idGuardian);

        res.status(HttpStatus.OK).json(challengeResult);
    } catch (error) {
        next(error);
    }
}

exports.removeChallenge = async (req, res, next) => {
    try {
        const id = req.params.id;
        const challengeRemoved = await service.removeChallenge(id);
        res.status(HttpStatus.NO_CONTENT).json(challengeRemoved);
    } catch (error) {
        next(error);
    }
}