const repository = require("../repository/spirit.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");
const warriorService = require("../services/warrior.service");
const { calculatePower } = require("../utils/formulas");

async function getAll() {
    const spirit = await repository.loadSpirit();
    return spirit.duels;
}

async function createDuel(idWarriorA, idWarriorB) {
    const spirit = await repository.loadSpirit();

    const warriorAIndex = spirit.warriors.findIndex(w => w.id == idWarriorA);
    const warriorBIndex = spirit.warriors.findIndex(w => w.id == idWarriorB);

    if (warriorAIndex === -1 || warriorBIndex === -1) {
        throw new NotFoundError("Warrior not found");
    }

    // traigo datos de ambos warriors
    const warriorA = spirit.warriors[warriorAIndex];
    const warriorB = spirit.warriors[warriorBIndex];

    // ambos pierden 8 de energia
    spirit.warriors[warriorAIndex].energy -= 8;
    spirit.warriors[warriorBIndex].energy -= 8;

    // calculo el poder de ambos
    const powerWarriorA = calculatePower(warriorA.rank, warriorA.xp, warriorA.energy, warriorA.artifacts);
    const powerWarriorB = calculatePower(warriorB.rank, warriorB.xp, warriorB.energy, warriorB.artifacts);

    // si hay empate
    if (powerWarriorA === powerWarriorB) {
        const result = {
            id: crypto.randomUUID(),
            warriorA: warriorA.id,
            powerWarriorA: powerWarriorA,
            warriorB: warriorB.id,
            powerWarriorB: powerWarriorB,
            winner: "draw",
            timestamp: new Date()
        }

        spirit.duels.push(result);
        await repository.saveSpirit(spirit);
        return result;
    }

    // si no,busco al ganador
    const winner = powerWarriorA > powerWarriorB ? warriorA : warriorB;
    const winnerIndex = spirit.warriors.findIndex(w => w.id == winner.id);

    // calculo de xp ganada, saco la diferencia
    const differencePower = Math.abs(powerWarriorA - powerWarriorB);

    let xpGained = 0;

    if (differencePower <= 12) xpGained = 25;
    if (differencePower <= 30) xpGained = 55;
    if (differencePower <= 60) xpGained = 85;
    if (differencePower > 60) xpGained = 140;

    // guardo antes de subir de nivel
    // sumar XP
    winner.xp += xpGained;
    spirit.warriors[winnerIndex] = winner;
    await repository.saveSpirit(spirit);

    // subir de nivel
    await warriorService.upLevel(winner.id);

    // recargar el archivo
    const updatedSpirit = await repository.loadSpirit();

    // obtener al warrior actualizado por ID
    const updatedWarriorIndex = updatedSpirit.warriors.findIndex(w => w.id === winner.id);
    const updatedWarrior = updatedSpirit.warriors[updatedWarriorIndex];

    // guardar la versión actualizada 
    updatedSpirit.warriors[updatedWarriorIndex] = updatedWarrior;

    // resultado final
    const result = {
            id: crypto.randomUUID(),
            warriorA: warriorA.id,
            powerWarriorA: powerWarriorA,
            warriorB: warriorB.id,
            powerWarriorB: powerWarriorB,
            winner: winner.id,
            timestamp: new Date()
        }

    updatedSpirit.duels.push(result);
    await repository.saveSpirit(updatedSpirit);
    return result;
}

module.exports = { getAll, createDuel }