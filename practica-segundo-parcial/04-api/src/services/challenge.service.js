const repository = require("../repositories/game.repository");
const NotFoundError = require("../errors/NotFoundError");
const crypto = require("crypto");
const BaseError = require("../errors/BaseError");
const HttpStatusCodes = require("../utils/HttpStatusCodes");
const guardianService = require("../services/guardians.service");
const { calculateXpFormula } = require("../utils/formulas");

async function getAllChallenges() {
    const game = await repository.loadGame();

    if (!game.challenges) {
        throw new NotFoundError("No se encontraron desafíos.");
    }

    return game.challenges
}

async function createChallenge(data) {
    const game = await repository.loadGame()

    const newChallenge = {
        id: crypto.randomUUID(),
        title: data.title,
        difficulty: data.difficulty,
        energyCost: data.energyCost,
        rewardFormula: data.rewardFormula,
        requiredSkill: data.requiredSkill
    }

    game.challenges.push(newChallenge);

    await repository.saveGame(game);
    return newChallenge;
}

async function patchChallenge(id, data) {
    const game = await repository.loadGame()

    const index = game.challenges.findIndex(c => c.id == id);

    if (index === -1) {
        return new NotFoundError(`No se encontró el desafío con el id ${id}`);
    }

    const challenge = game.challenges[index];

    const updatedChallenge = {
        ...challenge,
        ...data
    }

    game.challenges[index] = updatedChallenge;

    await repository.saveGame(game);
    return updatedChallenge;
}

async function attemptChallenge(idChallenge, idGuardian) {
    const game = await repository.loadGame();

    const guardian = game.guardians.find(g => g.id == idGuardian);

    if (!guardian) {
        throw new NotFoundError(`No se encontró el guardian con id: ${idGuardian}`);
    }

    const challenge = game.challenges.find(c => c.id == idChallenge);

    if (!challenge) {
        throw new NotFoundError(`No se encontró el desafío con id: ${idChallenge}`);
    }

    if (guardian.energy < challenge.energyCost) {
        throw new BaseError("El guardian no tiene la energía suficiente.", HttpStatusCodes.BAD_REQUEST);
    }

    if (guardian.skills.includes(challenge.requiredSkill)) {
        throw new BaseError("El guardian no tiene la skill requerida para realizar el desafío.");
    }

    // descontar energia del guardian
    guardian.energy -= challenge.energyCost;

    // calcular experiencia que ganaria el guardian
    const xpPossibleGained = calculateXpFormula(challenge.rewardFormula, { difficulty: challenge.difficulty,energyCost: challenge.energyCost
    })

    // evalúo el resultado del intento de desafio
    let challengePassed = true;

    // si falla el desafio
    if (challenge.difficulty > (guardian.level * 2)) {
        challengePassed = false

        // pierde energia adicional
        const penalization = challenge.difficulty * 3;
        guardian.energy -= penalization;
        
    }

    // si es exitoso
    if (challengePassed != false) {
        guardian.xp += xpPossibleGained;
        
        guardianService.upLevel(guardian.id);

    }

    const result = {
        id: crypto.randomUUID(),
        guardianId: guardian.id,
        challengeId:  challenge.id,
        state: challengePassed == true ? "success" : "failed",
        xpGained: challengePassed == true ? xpPossibleGained : 0,
    }

    game.challengesAttempts.push(result);

    await repository.saveGame(game);
    return result;
}

async function removeChallenge(idChallenge) {
    const game = await repository.loadGame();

    const challenge = game.challenge.find(c => c.id == idChallenge);
    
    if (!challenge) {
        throw new NotFoundError(`No se encontró el desafio con el id ${idChallenge}`);
    }

    const index = game.challenges.find(c => c.id == challenge.id);

    game.challenges.splice(index, 1);

    await repository.saveGame(game);
    return challenge;
}

module.exports = { getAllChallenges, createChallenge, patchChallenge, attemptChallenge, removeChallenge }