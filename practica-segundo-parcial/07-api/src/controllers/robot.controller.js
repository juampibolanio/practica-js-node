const service = require("../services/robots.service");
const HttpStatus = require("../utils/HttpStatus");

exports.getAllRobots = async (req, res, next) => {
    try {
        const robots = await service.getAllRobots();
        res.status(HttpStatus.OK).json(robots);
    } catch (error) {
        next(error);
    }
}

exports.createRobot = async (req, res, next) => {
    try {
        const createdRobot = await service.createRobot(req.body);
        res.status(HttpStatus.CREATED).json(createdRobot);
    } catch (error) {
        next(error);
    }
}

exports.updateComponents = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedRobot = await service.updateComponents(id, req.body);
    } catch (error) {
        next(error);
    }
}