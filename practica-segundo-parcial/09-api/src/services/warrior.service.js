const repository = require("../repository/spirit.repository");
const NotFoundError = require("../errors/NotFoundError");
const crypto = require("crypto");

async function getAll() {
    const spirit = await repository.loadSpirit();
    return spirit.warriors;
}

async function createWarrior(data) {
    const spirit = await repository.loadSpirit();

    const newWarrior = {
        id: crypto.randomUUID(),
        name: data.name,
        rank: 1,
        xp: 0,
        energy: 120,
        affinities: data.affinities ? data.affinities : [],
        artifacts: data.artifacts ? data.artifacts : []
    }

    spirit.warriors.push(newWarrior);
    await repository.saveSpirit(spirit);
    return newWarrior;
}

async function updateEnergy(id, data) {
    const spirit = await repository.loadSpirit();

    const warriorIndex = spirit.warriors.findIndex(w => w.id == id);

    if (warriorIndex === -1) {
        throw new NotFoundError("Warrior not found");
    }

    const warrior = spirit.warriors[warriorIndex];

    warrior.energy = data.energy;

    spirit.warriors[warriorIndex] = warrior;

    await repository.saveSpirit(spirit);
    return warrior;
}

async function updateArtifacts(id, data) {
    const spirit = await repository.loadSpirit();

    const warriorIndex = spirit.warriors.findIndex(w => w.id == id);

    if (warriorIndex === -1) {
        throw new NotFoundError("Warrior not found");
    }

    const warrior = spirit.warriors[warriorIndex];

    if (data.action == "add") {
        for (const item of data.artifacts) {
            warrior.artifacts.push(item);
        }

        spirit.warriors[warriorIndex] = warrior;
        await repository.saveSpirit(spirit);
        return warrior;
    }

    if (data.action == "remove") {
        const artifactIndex = warrior.artifacts.findIndex(a => a.name == data.artifactName);

        if (artifactIndex === -1) {
            throw new NotFoundError("Artifact not found");
        }

        warrior.artifacts.splice(artifactIndex, 1);
        spirit.warriors[warriorIndex] = warrior;
        await repository.saveSpirit(spirit);
        return warrior;
    }

    return "Required action: add or remove";
}

async function upLevel(id) {
    const spirit = await repository.loadSpirit();

    const warriorIndex = spirit.warriors.findIndex(w => w.id == id);

    if (warriorIndex === -1) {
        throw new NotFoundError("Warrior not found");
    }

    const warrior = spirit.warriors[warriorIndex];

    let levelsGained = 0;
    // verifico si puede subir de nivel
    while (warrior.xp >= warrior.rank * 60) {
        warrior.xp -= warrior.rank * 60;
        warrior.rank++;
        levelsGained++;
    }

    spirit.warriors[warriorIndex] = warrior;

    await repository.saveSpirit(spirit);
    return {
        name: warrior.name,
        levelsGained: levelsGained
    }
}

async function removeWarrior(id) {
    const spirit = await repository.loadSpirit();

    const warriorIndex = spirit.warriors.findIndex(w => w.id == id);

    if (warriorIndex === -1) {
        throw new NotFoundError("Warrior not found");
    }

    const warriorDeleted = spirit.warriors[warriorIndex];

    spirit.warriors.splice(warriorIndex, 1);
    await repository.saveSpirit(spirit);
    return warriorDeleted;
}

async function patchWarrior(id, data) {
    const spirit = await repository.loadSpirit();

    const warriorIndex = spirit.warriors.findIndex(w => w.id == id);

    if (warriorIndex === -1) {
        throw new NotFoundError("Warrior not found");
    }

    const warrior = spirit.warriors[warriorIndex];

    const updatedWarrior = {
        ...warrior,
        ...data,
        id: warrior.id,
    }
    spirit.warriors[warriorIndex] = updatedWarrior;
    await repository.saveSpirit(spirit);
    return updatedWarrior;
}


module.exports = { getAll, createWarrior, updateArtifacts, updateEnergy, removeWarrior, upLevel, patchWarrior }