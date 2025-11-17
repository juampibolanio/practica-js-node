const repository = require("../repository/alchemy.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");
const InsuficientEnergy = require("../errors/InsuficientEnergy");
const calculateFormula = require("../utils/formula");
const BaseError = require("../errors/BaseError");
const HttpStatus = require("../utils/HttpStatus");
const alchemistService = require("../services/alchemist.service");

async function getAll() {
    const alchemy = await repository.loadAlchemy();
    const trials = alchemy.trials;
    return trials;
}

async function createTrial(data) {
    const alchemy = await repository.loadAlchemy();

    const newTrial = {
        id: crypto.randomUUID(),
        title: data.title,
        difficulty: data.difficulty,
        energyCost: data.energyCost,
        rewardFormula: data.rewardFormula,
        requiredAffinity: data.requiredAffinity
    }

    alchemy.trials.push(newTrial);
    await repository.saveAlchemy(alchemy);
    return newTrial;
}

async function attemptTrial(idAlchemist, idTrial) {
    const alchemy = await repository.loadAlchemy();

    const alchemist = alchemy.alchemists.find(a => a.id == idAlchemist);

    if (!alchemist) {
        throw new NotFoundError(`No se encontró al alquimista con id: ${idAlchemist}`);
    }

    const trial = alchemy.trials.find(t => t.id == idTrial);

    if (!trial) {
        throw new NotFoundError(`No se encontró la prueba con id: ${idTrial}`);
    }

    if (alchemist.energy < trial.energyCost) {
        throw new InsuficientEnergy();
    }

    if (!(alchemist.affinities.includes(trial.requiredAffinity))) {
        throw new BaseError("El alquimista no tiene la afinidad requerida.", HttpStatus.BAD_REQUEST);
    }

    // calculo cuanta xp ganaria si pasa con exito
    const possibleGainedXp = calculateFormula(trial.rewardFormula, ({
        difficulty: trial.difficulty,
        energyCost: trial.energyCost
    }))

    // descuento energia

    alchemist.energy -= trial.energyCost;

    // verifico si pasa o no la prueba
    // si no lo pasa
    if (trial.difficulty > alchemist.rank * 2.5) {
        const penalization = trial.difficulty * 5;
        alchemist.energy -= penalization;

        const result = {
            id: crypto.randomUUID(),
            idAlchemist: idAlchemist,
            idTrial: idTrial,
            timeStampt: new Date.UTC(),
            status: "failed"
        }

        alchemy.attempts.push(result);
        await repository.saveAlchemy(alchemy);
        return result;
    }

    // si lo pasa
    alchemist.xp += possibleGainedXp;
    let levelsGained = await alchemistService.upLevel(alchemist.id);

    const result = {
        id: crypto.randomUUID(),
        idAlchemist: idAlchemist,
        idTrial: idTrial,
        xpGained: possibleGainedXp,
        timeStampt: new Date.UTC(),
        status: "success"
    }

    alchemy.attempts.push(result);
    await repository.saveAlchemy(alchemy);
    return result; 
}

async function getAllAttempts() {
    const alchemy = await repository.loadAlchemy();
    return alchemy.attempts;
}

module.exports = { getAll, createTrial, attemptTrial, getAllAttempts }