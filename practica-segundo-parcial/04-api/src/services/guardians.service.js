const repository = require("../repositories/game.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");

// listar todos los guardianes
async function getAllGuardian() {
    const game = await repository.loadGame();
    const guardians = game.guardians;

    return guardians;
}

// crear un guardian
async function createGuardian(data) {

    const game = await repository.loadGame();

    const newGuardian = {
        id: crypto.randomUUID(),
        name: data.name,
        level: 1,
        xp: 0,
        energy: 100,
        skills: data.skills ? data.skills : [],
        items: data.items ? data.items : [],
    }
    
    game.guardians.push(newGuardian);
    await repository.saveGame(game);

    return newGuardian;
}

// actualizar los items de un guardian
async function updateGuardianItems(id, data) {
    const game = await repository.loadGame();

    const index = game.guardians.findIndex(g => g.id == id);

    if (index === -1) {
        throw new NotFoundError(`El guardián con id ${id} no fue encontrado.`);
    }

    const guardian = game.guardians[index];

    // añadir y remover items
    if (data.action === "remove") {

        const itemIndex = guardian.items.findIndex(i => i.name === data.itemName);

        if (itemIndex === -1) {
            throw new NotFoundError(`El item ${data.itemName} no existe en este guardián.`);
        }

        guardian.items.splice(itemIndex, 1);

        game.guardians[index] = guardian;
        await repository.saveGame(game);
        return guardian;
    }

    if (data.action === "add") {

        for (const item of data.items) {
            guardian.items.push(item);
        }

        game.guardians[index] = guardian;
        await repository.saveGame(game);
        return guardian;
    }

    throw new BadRequestError("La acción debe ser 'add' o 'remove'");
}

// actualizar la energia de un guardian
async function updateEnergyGuardian(id, data) {
    const game = await repository.loadGame();

    const index = game.guardians.findIndex(g => g.id == id);

    if (index === -1) {
        throw new NotFoundError(`El guardián con id ${id} no fue encontrado.`);
    }

    const guardian = game.guardians[index];

    const updatedGuardian = {
        ...guardian,
        energy: data.energy
    }

    game.guardians[index] = updatedGuardian;
    
    await repository.saveGame(game);
    return updatedGuardian;
}

// actualizar parcialmente un guardian
async function patchGuardian(id, data) {
    const game = await repository.loadGame();

    const index = game.guardians.findIndex(g => g.id == id);

    if (index === -1) {
        throw new NotFoundError(`El guardián con id ${id} no fue encontrado.`);
    }

    const guardian = game.guardians[index];

    const updatedGuardian = {
        ...guardian,
        ...data
    }

    game.guardians[index] = updatedGuardian;

    await repository.saveGame(game);
    return updatedGuardian;
}

// eliminar un guardian
async function removeGuardian(id) {
    const game = await repository.loadGame();

    const index = game.guardians.findIndex(g => g.id == id);

    if (index === -1) {
        throw new NotFoundError(`El guardián con el id ${id} no fue encontrado.`);
    }

    const guardian = game.guardians[index];

    game.guardians.splice(index, 1);

    await repository.saveGame(game);
    return guardian;
}

// subir de nivel a guardian
async function upLevel(id) {
    const game = await repository.loadGame();

    const guardian = game.guardians.find(g => g.id == id);

    if (!guardian) {
        throw new NotFoundError(`El guardian con el id ${id} no existe.`);
    }

    let levelsGained = 0;
    while (guardian.xp >= guardian.level * 75){
        guardian.xp -= guardian.level * 75;
        guardian.level += 1;
        levelsGained++;
        
    }
    
    await repository.saveGame(game);

    const response = {
        guardian: guardian, 
        levelsGained: levelsGained,
    }

    return response;
}

module.exports = { getAllGuardian, createGuardian, updateGuardianItems, updateEnergyGuardian, patchGuardian, upLevel };