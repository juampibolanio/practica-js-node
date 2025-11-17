const repository = require("../repository/alchemy.repository");
const NotFoundError = require("../errors/NotFoundError");
const { calculatePower } = require("../utils/formula");
const alchemistService = require("../services/alchemist.service");
const crypto = require("crypto");

async function getAllDuels() {
    const alchemy = await repository.loadAlchemy();
    return alchemy.duels;
}

async function createDuel(data) {
    const alchemy = await repository.loadAlchemy();

    const alchemistA = alchemy.alchemists.find(a => a.id == data.idAlchemistA);
    if (!alchemistA)
        throw new NotFoundError(`No se encontró el alquimista con id: ${data.idAlchemistA}`);

    const alchemistB = alchemy.alchemists.find(a => a.id == data.idAlchemistB);
    if (!alchemistB)
        throw new NotFoundError(`No se encontró el alquimista con id: ${data.idAlchemistB}`);

    if (alchemistA.energy < 15 || alchemistB.energy < 15) {
        throw new Error("No es posible realizar el duelo porque uno de los alquimistas tiene menos de 15 de energia");
    }

    const alchemistAIndex = alchemy.alchemists.findIndex(a => a.id == alchemistA.id);
    const alchemistBIndex = alchemy.alchemists.findIndex(a => a.id == alchemistB.id);

    const powerA = calculatePower(alchemistA.rank, alchemistA.xp, alchemistA.energy, alchemistA.catalysts);
    const powerB = calculatePower(alchemistB.rank, alchemistB.xp, alchemistB.energy, alchemistB.catalysts);

    // EMPATE
    if (powerA === powerB) {
        const duel = {
            id: crypto.randomUUID(),
            alchemistA: alchemistA.name,
            alchemistB: alchemistB.name,
            winner: "draw",
            powerAlchemistA: powerA,
            powerAlchemistB: powerB,
            timestamp: new Date(),
        };

        alchemy.duels.push(duel);
        await repository.saveAlchemy(alchemy);
        return duel;
    }

    // GANADOR
    const winner = powerA > powerB ? alchemistA : alchemistB;
    const winnerIndex = winner.id === alchemistA.id ? alchemistAIndex : alchemistBIndex;

    const powerDifference = Math.abs(powerA - powerB);
    let xpGained;

    if (powerDifference <= 20) xpGained = 30;
    else if (powerDifference <= 40) xpGained = 70;
    else if (powerDifference <= 80) xpGained = 120;
    else xpGained = 180;

    // RESTAR ENERGÍA
    alchemy.alchemists[alchemistAIndex].energy -= 15;
    alchemy.alchemists[alchemistBIndex].energy -= 15;

    // SUMAR XP
    alchemy.alchemists[winnerIndex].xp += xpGained;

    // GUARDAR XP Y ENERGÍA ANTES DE SUBIR NIVEL
    await repository.saveAlchemy(alchemy);

    // SUBIR NIVEL
    await alchemistService.upLevel(winner.id);

    // RECARGO EL JSN
    const updatedAlchemy = await repository.loadAlchemy();

    // REGISTRAR DUELO
    const duel = {
        id: crypto.randomUUID(),
        alchemistA: alchemistA.name,
        alchemistB: alchemistB.name,
        winner: winner.name,
        powerAlchemistA: powerA,
        powerAlchemistB: powerB,
        xpGained,
        timestamp: new Date(),
    };

    updatedAlchemy.duels.push(duel);

    // GUARDAR 
    await repository.saveAlchemy(updatedAlchemy);

    return duel;
}

module.exports = { getAllDuels, createDuel };
