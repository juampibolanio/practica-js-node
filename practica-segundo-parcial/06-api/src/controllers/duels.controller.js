const duelService = require("../services/duels.service");
const HttpStatus = require("../utils/HttpStatus");

exports.getAllDuels = async (req, res, next) => {
    try {
        const duels = await duelService.getAllDuels();
        res.status(HttpStatus.OK).json(duels);
    } catch (error) {
        next(error);
    }
}

exports.createDuel = async (req, res, next) => {
    try {
        const idAlchemistA = req.params.idAlchemistA;
        const idAlchemistB = req.params.idAlchemistB;
        const duelCreated = await duelService.createDuel({
            idAlchemistA: idAlchemistA,
            idAlchemistB: idAlchemistB
        })
        res.status(HttpStatus.CREATED).json(duelCreated);
    } catch (error) {
        next(error);
    }
}
