const repository = require("../repository/game.repository");
const NotFoundError = require("../errors/NotFoundError");
const crypto = require("crypto");
const { calculateFormula } = require("../utils/formulas");
const BaseError = require("../errors/BaseError");
const HttpStatus = require("../utils/HttpStatus");
const guardianService = require("../services/guardian.service");

async function getAll() {
    const game = await repository.loadGame();
    return game.challenges
}

async function createChallenge(data) {
    const game = await repository.loadGame();

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

async function attemptChallenge(idChallenge, idGuardian) {
    const game = await repository.loadGame();

    const guardianIndex = game.guardians.findIndex(g => g.id == idGuardian);

    if (guardianIndex === -1) {
        throw new NotFoundError("Guardian not found");
    }

    const guardian = game.guardians[guardianIndex];

    const challengeIndex = game.challenges.findIndex(c => c.id == idChallenge);

    if (challengeIndex === -1) {
        throw new NotFoundError("Challenge not found");
    }

    const challenge = game.challenges[challengeIndex];

    if (guardian.energy < challenge.energyCost) {
        throw new BaseError("The guardian hasn´t required energy.", HttpStatus.BAD_REQUEST);
    }

    if (!guardian.skills.includes(challenge.requiredSkill)) {
        throw new BaseError("The guardian hasn´t required skill");
    };

    // descontar energia del guardian
    guardian.energy -= challenge.energyCost;

    // calculo la posible xp ganada
    let possibleXpGained = calculateFormula(challenge.rewardFormula, {difficulty: challenge.difficulty, energyCost: challenge.energyCost });

    // verifico si gana o no
    if (challenge.difficulty > (guardian.level * 2)) {
        const penalization = challenge.difficulty * 3;
        guardian.energy -= penalization;

        const result = {
            id: crypto.randomUUID(),
            status: "failed",
            guardianId: guardian.id,
            challengeId: challenge.id,
            penalization: penalization
        }
        game.guardians[guardianIndex] = guardian;
        game.attempts.push(result);
        await repository.saveGame(game);
        return result;
    }

    guardian.xp += possibleXpGained;
    // guardo primero el guardian y dps calculo si sube de nivel
    game.guardians[guardianIndex] = guardian;
    await repository.saveGame(game);

    await guardianService.upLevel(guardian.id);

    const updatedGame = await repository.loadGame();

    const result =  {
        id: crypto.randomUUID(),
        status: "success",
        guardianId: guardian.id,
        challengeId: challenge.id,
    }

    updatedGame.attempts.push(result);
    await repository.saveGame(updatedGame);
    return result;
}

async function deleteChallenge(id) {
    const game = await repository.loadGame();

    const challengeIndex = game.challenges.findIndex(c => c.id == id);

    if (challengeIndex === -1) {
        throw new NotFoundError("Challenge not found");
    }

    game.challenges.splice(challengeIndex, 1);
    await repository.saveGame(game);
    return "Deleted";
}

module.exports = { getAll, createChallenge, attemptChallenge, deleteChallenge };