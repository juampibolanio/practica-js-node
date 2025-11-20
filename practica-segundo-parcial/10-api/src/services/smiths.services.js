const repository = require("../repository/arcane.repository");
const NotFoundError = require("../errors/NotFoundError");
const crypto = require("crypto");
const BaseError = require("../errors/BaseError");

async function getAll() {
    const arcane = await repository.loadArcane();
    return arcane.smiths;
}

async function createSmith(data) {
    const arcane = await repository.loadArcane();

    const newSmith = {
        id: crypto.randomUUID(),
        name: data.name,
        tier: 1,
        xp: 0,
        energy: 100,
        runes: data.runes ? data.runes : [],
        crystals: data.crystals ? data.crystals : []
    }

    arcane.smiths.push(newSmith);
    await repository.saveArcane(arcane);
    return newSmith;
}

async function upLevel(id) {
    const arcane = await repository.loadArcane();

    const smithIndex = arcane.smiths.findIndex(a => a.id == id);

    if (smithIndex === -1) {
        throw new NotFoundError("Smith not found");
    }

    const smith = arcane.smiths[smithIndex];

    // hago que suba de nivel si puede
    let levelsGained = 0;

    while (smith.xp >= smith.tier * 80) {
        smith.xp -= smith.tier * 80;
        smith.tier++
        levelsGained++;
    }

    const result = {
        name: smith.name,
        levelsGained: levelsGained
    }

    arcane.smiths[smithIndex] = smith;
    await repository.saveArcane(arcane);
    return result;
}

async function updateEnergy(id, energy) {
    const arcane = await repository.loadArcane();

    const smithIndex = arcane.smiths.findIndex(a => a.id == id);

    if (smithIndex === -1) {
        throw new NotFoundError("Smith not found");
    }

    const smith = arcane.smiths[smithIndex];

    smith.energy = energy;

    arcane.smiths[smithIndex] = smith;
    await repository.saveArcane(arcane);
    return smith;
}

async function updateCrystals(id, data) {
    const arcane = await repository.loadArcane();

    const smithIndex = arcane.smiths.findIndex(a => a.id == id);

    if (smithIndex === -1) {
        throw new NotFoundError("Smith not found");
    }

    const smith = arcane.smiths[smithIndex];

    if (data.action == "add") {
        for (const crystal of data.crystals) {
            smith.crystals.push(crystal);
        }

        arcane.smiths[smithIndex] = smith;
        await repository.saveArcane(arcane);
        return smith;
    }

    if (data.action = "remove") {
        const crystalIndex = smith.crystals.findIndex(c => c.name == data.crystalName);

        if (crystalIndex === -1) {
            throw new NotFoundError("Crystal not found");
        }

        smith.crystals.splice(crystalIndex, 1);
        arcane.smiths[smithIndex] = smith;
        await repository.saveArcane(arcane);
        return smith;
    }

    throw new BaseError("Need specify a action: add or remove");
}

async function removeSmith(id) {
    const arcane = await repository.loadArcane();

    const smithIndex = arcane.smiths.findIndex(a => a.id == id);

    if (smithIndex === -1) {
        throw new NotFoundError("Smith not found");
    }

    const smithRemoved = arcane.smiths[smithIndex];

    arcane.smiths.splice(smithIndex);
    await repository.saveArcane(arcane);
    return smithRemoved;
}

module.exports = { getAll, createSmith, updateCrystals, updateEnergy, removeSmith };