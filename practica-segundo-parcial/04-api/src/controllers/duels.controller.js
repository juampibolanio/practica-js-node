const service = require("../services/duels.service");
const HttpStatus = require("../utils/HttpStatusCodes");

exports.getAllDuels = async (req, res, next) => {
    try {
        const duels = await service.getAllDuels();
        res.status(HttpStatus.OK).json(duels);
    } catch (error) {
        next(error);
    }
}

exports.createDuel = async (req, res, next) => {
    try {
        const id1 = req.params.guardianIdA;
        const id2 = req.params.guardianIdB;

        const duelCreated = await service.createDuel(id1, id2);
        res.status(HttpStatus.CREATED).json(duelCreated);
    } catch (error) {
        next(error);
    }
}

exports.removeDuel = async (req, res, next) => {
    try {
        const id = req.params.guardianId;
        const duelRemoved = await service.removeDuel(id);
        res.status(HttpStatus.NO_CONTENT).json(duelRemoved);
    } catch (error) {
        next(error);
    }
}