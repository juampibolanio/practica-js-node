const service = require("../services/duels.service");
const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

exports.getAllDuels = async (req, res, next) => {
    try {
        const duels = await service.getAll();
        return Response.success(res, duels, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createDuels = async (req, res, next) => {
    try {
        const idWarriorA = req.params.idWarriorA;
        const idWarriorB = req.params.idWarriorB;
        const createdDuel = await service.createDuel(idWarriorA, idWarriorB);
        return Response.success(res, createdDuel, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}