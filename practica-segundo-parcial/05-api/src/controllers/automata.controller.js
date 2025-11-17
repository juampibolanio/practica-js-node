const service = require("../services/automata.service");
const HttpStatus = require("../utils/HttpStatus");

exports.getAllAutomatas = async (req, res, next) => {
    try {
        const automatas = await service.getAllAutomatas();
        res.status(HttpStatus.OK).json(automatas);
    } catch (error) {
        next(error);
    }
}

exports.createAutomata = async (req, res, next) => {
    try {
        const createdAutomata = await service.createAutomata(req.body);
        res.status(HttpStatus.CREATED).json(createdAutomata);
    } catch (error) {
        next(error);
    }
}

exports.updateEnergy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedAutomataEnergy = await service.updateEnergy(id, req.body);
        res.status(HttpStatus.OK).json(updatedAutomataEnergy);
    } catch (error) {
        next(error);
    }
}

exports.updateComponents = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedAutomataComponents = await service.updateComponents(id, req.body);
        res.status(HttpStatus.OK).json(updatedAutomataComponents);
    } catch (error) {
        next(error); 
    }
}