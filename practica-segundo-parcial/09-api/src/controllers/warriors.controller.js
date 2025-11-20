const service = require("../services/warrior.service");
const HttpStatus = require("../utils/HttpStatus");
const Response = require("../utils/response");

exports.getAllWarriors = async (req, res, next) => {
    try {
        const warriors = await service.getAll();
        return Response.success(res, warriors, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.createWarrior = async (req, res, next) => {
    try {
        const warriorCreated = await service.createWarrior(req.body);
        return Response.success(res, warriorCreated, HttpStatus.CREATED);
    } catch (error) {
        next(error);
    }
}

exports.updateEnergy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedLevelWarrior = await service.updateEnergy(id, req.body);
        return Response.success(res, updatedLevelWarrior, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.updateArtifacts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedWarriorArtifacts = await service.updateArtifacts(id, req.body);
        return Response.success(res, updatedWarriorArtifacts, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}

exports.removeWarrior = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedWarrior = await service.removeWarrior(id);
        return Response.success(res, deletedWarrior, HttpStatus.NO_CONTENT);
    } catch (error) {
        next(error);
    }
}

exports.patchWarrior = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedWarrior = await service.patchWarrior(id, req.body);
        return Response.success(res, updatedWarrior, HttpStatus.OK);
    } catch (error) {
        next(error);
    }
}