const repository = require("../repository/spirit.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");
const BaseError = require("../errors/BaseError");
const { calculateFormula } = require("../utils/formulas");
const warriorService = require("../services/warrior.service");

async function getAll() {
    const spirit = await repository.loadSpirit();

    return spirit.trials;
}

async function createTrial(data) {
    const spirit = await repository.loadSpirit();

    const newTrial = {
        id: crypto.randomUUID(),
        title: data.title,
        difficulty: data.difficulty,
        energyCost: data.energyCost,
        rewardFormula: data.rewardFormula,
        requiredAffinity: data.requiredAffinity
    }

    spirit.trials.push(newTrial);
    await repository.saveSpirit(spirit);
    return newTrial;
}

async function attemptTrial(idTrial, idWarrior) {
    const spirit = await repository.loadSpirit();

    const warriorIndex = spirit.warriors.findIndex(w => w.id == idWarrior);
    if (warriorIndex === -1 ) {
        throw new NotFoundError("Warrior not found");
    }

    const trialIndex = spirit.trials.findIndex(t => t.id == idTrial);
    if (trialIndex === -1 ) {
        throw new NotFoundError("Trial not found");
    }

    // cargo el warrior y trial
    const warrior = spirit.warriors[warriorIndex];
    const trial = spirit.trials[trialIndex];

    // verifico q el warrior tenga la afinidad requerida
    if (!warrior.affinities.includes(trial.requiredAffinity)) {
        throw new BaseError("The warrior not have the required affinity");
    }

    // verifico q tenga la energia suficiente
    if (warrior.energy < trial.energyCost) {
        throw new BaseError("The warrior not have the sufficient energy");
    }

    //evaluo la posible experiencia ganada
    const xpGained = calculateFormula(trial.rewardFormula, { difficulty: trial.difficulty, energyCost: trial.energyCost});

    // pierde energia solo por intentar
    warrior.energy -= 5;

    // resuelvo si pasa o no

    // si no pasa
    if (trial.difficulty > warrior.rank * 2.2) {
        const penalization = trial.difficulty * 4;
        // aplico penalizacion
        warrior.energy -= penalization;

        const result = {
            id: crypto.randomUUID(),
            status: "failed",
            idWarrior: warrior.id,
            idTrial: trial.id,
            timestamp: new Date(),
            xpGained: 0
        }

        spirit.attempts.push(result);
        spirit.warriors[warriorIndex] = warrior;
        await repository.saveSpirit(spirit);
        return result;
    }

    // si pasa
    warrior.xp += xpGained;
    
    // guardo para q se le sume la xp nueva
    spirit.warriors[warriorIndex] = warrior;
    await repository.saveSpirit(spirit);

    // recargo
    const updatedSpirit = await repository.loadSpirit();

    // aplico subida de nivel 
    await warriorService.upLevel(warrior.id);

    // recargo
    const newSpirit = await repository.loadSpirit();
    const updatedWarrior = newSpirit.warriors.find(w => w.id == warrior.id);

    // guardo todo
    newSpirit.warriors[warriorIndex] = updatedWarrior;

    const result = {
            id: crypto.randomUUID(),
            status: "success",
            idWarrior: warrior.id,
            idTrial: trial.id,
            timestamp: new Date(),
            xpGained: xpGained
        }

    newSpirit.attempts.push(result);
    await repository.saveSpirit(newSpirit);
    return result;
}

module.exports = { getAll, createTrial, attemptTrial }