const service = require("../services/duels.service");
const Response = require("../utils/response");
const HttpStatus = require("../utils/HttpStatus");

exports.getAllDuels = async (req, res, next) => {
    try {
        const data = await service.getAll();
        return Response.success(res, data, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createDuel = async (req, res, next) => {
    try {
        const { idGuardianA, idGuardianB} = req.body;
        const duel = await service.createDuel(idGuardianA, idGuardianB);
        return Response.success(res, duel, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}