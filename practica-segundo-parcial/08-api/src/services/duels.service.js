const repository = require("../repository/game.repository");
const NotFoundError = require("../errors/NotFoundError");
const guardianService = require("../services/guardian.service");
const { calculatePower } = require("../utils/formulas")

async function getAll() {
    const game = await repository.loadGame();
    return game.duels;
}

async function createDuel(idGuardianA, idGuardianB) {
    const game = await repository.loadGame();

    // busco el indice de ambos guardianes
    const guardianIndexA = game.guardians.findIndex(g => g.id == idGuardianA);
    const guardianIndexB = game.guardians.findIndex(g => g.id == idGuardianB);

    if (guardianIndexA === -1 || guardianIndexB === -1) {
        throw new NotFoundError("One of the two guardians not found");
    }

    // almaceno los dos guardianes
    const guardianA = game.guardians[guardianIndexA];
    const guardianB = game.guardians[guardianIndexB];

    // calculo el poder de ambos
    const powerGuardianA = calculatePower(guardianA.level, guardianA.xp, guardianA.energy, guardianA.items);
    const powerGuardianB = calculatePower(guardianB.level, guardianB.xp, guardianB.energy, guardianB.items);

    // ambos pierden 10 de energia
    game.guardians[guardianIndexA].energy -= 10;
    game.guardians[guardianIndexB].energy -= 10;
    
    // en caso de empate
    if (powerGuardianA === powerGuardianB) {
        const result = {
            id: crypto.randomUUID(),
            guardianA: idGuardianA,
            guardianB: idGuardianB,
            winner: "draw",
            powerGuardianA: powerGuardianA,
            powerGuardianB: powerGuardianB,
            timestamp: new Date()
        }

        game.duels.push(result);
        await repository.saveGame(game);
        return result;
    }

    // determino el ganador y busco su indice
    let winner = powerGuardianA > powerGuardianB ? guardianA : guardianB;
    const winnerIndex = game.guardians.findIndex(g => g.id == winner.id);

    // calculo la diferencia de poder
    let differencePower = Math.abs(powerGuardianA - powerGuardianB);

    if (differencePower <= 10) winner.xp += 20;
    else if (differencePower <= 25) winner.xp += 50;
    else if (differencePower <= 50) winner.xp += 80;
    else if (differencePower > 50) winner.xp += 120;

    // guardo antes de subir de nivel
    game.guardians[winnerIndex] = winner;

    // guardo los cambios antes de subir el nivel
    await repository.saveGame(game);

    // subo nivel
    await guardianService.upLevel(winner.id);

    // recargo nuevamente el json con los ultimos cambios
    const updatedGame = await repository.loadGame();

    // registro duelo
    const result = {
        id: crypto.randomUUID(),
        guardianA: idGuardianA,
        guardianB: idGuardianB,
        winner: winner.id,
        powerGuardianA: powerGuardianA,
        powerGuardianB: powerGuardianB,
        timestamp: new Date()
    }

    // guardo y retorno resultado
    updatedGame.duels.push(result);
    await repository.saveGame(updatedGame);
    return result;
}

module.exports = { getAll, createDuel }