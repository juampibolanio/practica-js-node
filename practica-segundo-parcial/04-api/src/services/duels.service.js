const repository = require("../repositories/game.repository");
const NotFoundError = require("../errors/NotFoundError");
const { calculateWinnerFormula, calculateDifferencePower } = require("../utils/formulas");
const guardiansService = require("../services/guardians.service");

async function getAllDuels() {
    const game = await repository.loadGame();

    return game.duels;
}

async function createDuel(guardianIdA, guardianIdB) {
    const game = await repository.loadGame();

    const guardianA = game.guardians.find(g => g.id == guardianIdA);

    const guardianB = game.guardians.find(g => g.id == guardianIdB);

    if (!guardianA || !guardianB) {
        throw new NotFoundError("Uno o ambos guardianes no existen.");
    }
    
    // calculo el poder total de cada uno
    const powerGuardianA = calculateWinnerFormula(guardianA.level, guardianA.xp, guardianA.energy, guardianA.items);
    
    const powerGuardianB = calculateWinnerFormula(guardianB.level, guardianB.xp,
        guardianB.energy, guardianB.items
    )

    // defino el ganador
    let winner;

    if (powerGuardianA > powerGuardianB) {
        winner = guardianA;
    } else {
        winner = guardianB;
    }

    // ambos pierden 10 de energia dps del duelo
    guardianA.energy -= 10;
    guardianB.energy -= 10;

    // calcular la ganancia de xp para el ganador
    const powerDifference = calculateDifferencePower(powerGuardianA, powerGuardianB);

    let xpGained = 0;
    switch (powerDifference) {
        case powerDifference <= 10:
                xpGained = 20;
            break;
        case powerDifference <= 25:
                xpGained = 50;
            break;
        case powerDifference <= 50:
                xpGained = 80;
            break;
        case powerDifference > 50:
                xpGained = 120;
            break;
        default:
            break;
    }

    // aplico formula de subida de nivel
    guardiansService.upLevel(winner.id);

    // creo registro de duelo
    const duelResult = {
        id: crypto.randomUUID(),
        guardian1: guardianA.id,
        guardian2: guardianB.id,
        winner: winner.id,
        power1: powerGuardianA,
        power2: powerGuardianB,
        timestamp: new Date().toISOString(),
    }

    // registro en el json
    game.duels.push(duelResult);

    await repository.saveGame(game);
    return duelResult;
}

async function removeDuel(id) {
    const game = await repository.saveGame();

    const index = game.duels.findIndex(d => d.id == id);

    if (index === -1) {
        throw new NotFoundError("No se encontró el duelo con id ", id)
    }

    const duelRemoved = game.duels[index];

    game.duels.splice(index, 1);
    await repository.saveGame(game);
    return duelRemoved;
}

module.exports = { getAllDuels, createDuel, removeDuel }