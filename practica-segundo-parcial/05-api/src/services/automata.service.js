const repository = require("../repository/lab.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");

async function getAllAutomatas() {
    const lab = await repository.loadLab();
    const automatas = lab.automatons;
    return automatas;
}

async function createAutomata(data) {
    const lab = await repository.loadLab();

    const newAutomata = {
        id: crypto.randomUUID(),
        modelName: data.modelName,
        level: 1,
        energy: 100,
        xp: 0,
        components: data.components ? data.components : [],
        protocols: data.protocols ? data.protocols : [],
    }

    lab.automatons.push(newAutomata);
    await repository.saveLab(lab);
    return newAutomata;
}

async function updateEnergy(id, data) {
    const lab = await repository.loadLab();

    const automataIndex = lab.automatons.findIndex(a => a.id == id);

    if (automataIndex === -1) {
        throw new NotFoundError("No se encontró el autómata");
    }

    const automata = lab.automatons[automataIndex];

    const updatedAutomata = {
        ...automata,
        energy: data.energy
    }

    lab.automatons[automataIndex] = updatedAutomata;

    await repository.saveLab(lab);
    return updatedAutomata;
}

async function updateComponents(id, data) {
    const lab = await repository.loadLab();

    const automataIndex = lab.automatons.findIndex(a => a.id == id);

    if (automataIndex === -1) {
        throw new NotFoundError("No se encontró el autómata");
    }

    const automata = lab.automatons[automataIndex];

    if (data.action === "remove") {
        const componentIndex = automata.components.findIndex(i => i.name == data.componentName);

        if (componentIndex === -1) {
            throw new NotFoundError(`No se encontró el componente con nombre ${componentName}`);
        }

        automata.components.splice(componentIndex, 1);

        lab.automatons[automataIndex] = automata;
        await repository.saveLab(lab);
        return automata;
    }

    if (data.action === "add") {
        
        for (const component of data.components) {
            automata.components.push(component);
        }

        lab.automatons[automataIndex] = automata;
        await repository.saveLab(lab);
        return automata;
    }

    return new Error("La acción debe ser add o remove");
}

async function upLevel(id, xp) {
    const lab = await repository.loadLab();

    const automataIndex = lab.automatons.findIndex(a => a.id == id);

    if (automataIndex === -1) {
        throw new NotFoundError("No se encontró el autómata con esa id");
    }

    const automata = lab.automatons[automataIndex];

    let levelsGained = 0;
    while (xp >= automata.level * 90) {
        automata.level += 1;
        automata.xp = xp - (level * 90);
        levelsGained++;
    }

    await repository.saveLab(lab);
    return levelsGained > 1 ? levelsGained : "No se han ganado niveles";
}

module.exports = {  getAllAutomatas, createAutomata, updateEnergy, updateComponents, upLevel};