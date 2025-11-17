const repository = require("../repository/alchemy.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");

async function getAll() {
    const alchemy = await repository.loadAlchemy();
    return alchemy.alchemists;
}

async function createAlchemist(data) {
    const alchemy = await repository.loadAlchemy();

    const newAlchemy = {
        id: crypto.randomUUID(),
        name: data.name,
        rank: 1,
        xp: 0,
        energy: 120,
        affinities: data.affinities ? data.affinities : [],
        catalysts: data.catalysts ? data.catalysts : []
    };

    alchemy.alchemists.push(newAlchemy);
    await repository.saveAlchemy(alchemy);
    return newAlchemy;
}

async function updateEnergy(id, data) {
    const alchemy = await repository.loadAlchemy();

    const alchemistIndex = alchemy.alchemists.findIndex(a => a.id == id);
    if (alchemistIndex === -1)
        throw new NotFoundError(`No se encontro al alquimista con id: ${id}`);

    alchemy.alchemists[alchemistIndex].energy = data.energy;

    await repository.saveAlchemy(alchemy);
    return alchemy.alchemists[alchemistIndex];
}

async function updateCatalysts(id, data) {
    const alchemy = await repository.loadAlchemy();

    const alchemistIndex = alchemy.alchemists.findIndex(a => a.id == id);
    if (alchemistIndex === -1)
        throw new NotFoundError(`No se encontro al alquimista con id: ${id}`);

    const alchemist = alchemy.alchemists[alchemistIndex];

    if (data.action === "add") {
        for (const item of data.catalysts) {
            alchemist.catalysts.push(item);
        }
    }

    if (data.action === "delete") {
        const catalystIndex = alchemist.catalysts.findIndex(c => c.name == data.catalystName);
        if (catalystIndex === -1)
            throw new NotFoundError(`No se encontró el catalizador con el nombre ${data.catalystName}`);

        alchemist.catalysts.splice(catalystIndex, 1);
    }

    alchemy.alchemists[alchemistIndex] = alchemist;
    await repository.saveAlchemy(alchemy);
    return alchemist;
}

async function upLevel(id) {
    const alchemy = await repository.loadAlchemy();

    const alchemistIndex = alchemy.alchemists.findIndex(a => a.id == id);
    if (alchemistIndex === -1)
        throw new NotFoundError(`No se encontro al alquimista con id: ${id}`);

    const alchemist = alchemy.alchemists[alchemistIndex];

    let levelsGained = 0;

    // Mientras tenga XP suficiente para subir de nivel:
    while (alchemist.xp >= alchemist.rank * 100) {
        alchemist.xp -= alchemist.rank * 100;
        alchemist.rank++;
        levelsGained++;
    }

    alchemy.alchemists[alchemistIndex] = alchemist;
    await repository.saveAlchemy(alchemy);

    return levelsGained;
}

module.exports = { getAll, createAlchemist, updateCatalysts, updateEnergy, upLevel };
