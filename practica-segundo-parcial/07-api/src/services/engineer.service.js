const repository = require("../repository/nexus.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");

async function getAll() {
    const nexus = await repository.loadNexus();
    
    return nexus.engineers;
}

async function createEngineer(data) {
    const nexus = await repository.loadNexus();

    const newEngineer = {
        id: crypto.randomUUID(),
        name: data.name,
        level: 1,
        xp: 0,
        skillset: data.skillset ? data.skillset : [],
        robots: data.robots ? data.robots : [],
    }

    nexus.engineers.push(newEngineer);
    await repository.saveNexus(nexus);
    return newEngineer;
}

async function upLevel(id) {
    const nexus = await repository.loadNexus();

    const engineerIndex = nexus.engineers.findIndex(e => e.id == id);

    if (engineerIndex === -1) {
        throw new NotFoundError("No se encontró al ingeniero con la id indicada");
    }

    const engineer = nexus.engineers[engineerIndex];
    
    let levelsGained = 0;

    while (engineer.xp >= (engineer.level * 50)) {
        engineer.xp -= (engineer.level * 50);
        engineer.level += 1;
        levelsGained++
    }

    nexus.engineers[engineerIndex] = engineer;

    const result = {
        levelsGained: levelsGained,
    }

    await repository.saveNexus(nexus);

    return result;
}

async function updateXp(id, data) {
    const nexus = await repository.loadNexus();
    
    const engineerIndex = nexus.engineers.findIndex(e => e.id == id);

    if (engineerIndex === -1) {
        throw new NotFoundError("No se encontró al ingeniero con el id indicado");
    }

    const engineer = nexus.engineers[engineerIndex];

    engineer.xp = data.xp;

    nexus.engineers[engineerIndex];

    await repository.saveNexus(nexus);
    return engineer;
}

module.exports = { getAll, createEngineer, upLevel, updateXp };