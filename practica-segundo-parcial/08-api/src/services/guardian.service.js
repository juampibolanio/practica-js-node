const repository = require("../repository/game.repository");
const NotFoundError = require("../errors/NotFoundError");
const crypto = require("crypto");

async function getAll() {
    const game = await repository.loadGame();
    return game.guardians;
}

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

async function deleteGuardian(id) {
    const game = await repository.loadGame("");

    const guardianIndex = game.guardians.findIndex(g => g.id == id);

    if (guardianIndex === -1) {
        throw new NotFoundError("Guardian not found");
    }

    const removedGuardian = game.guardians[guardianIndex];

    game.guardians.splice(guardianIndex, 1);
    await repository.saveGame(game);
    return removedGuardian;
}

async function upLevel(id) {
    const game = await repository.loadGame();

    const guardianIndex = game.guardians.findIndex(g => g.id == id);

    if (guardianIndex === -1) {
        throw new NotFoundError("Guardian not found");
    }

    const guardian = game.guardians[guardianIndex];

    let levelsGained = 0;
    while (guardian.xp >= (guardian.level * 75)) {
        guardian.xp -= (guardian.level * 75);
        guardian.level += 1;
        levelsGained++;
        
        if (guardian.xp < 0) {
            guardian.xp = 0;
            break;
        }
    }

    game.guardians[guardianIndex] = guardian;
    await repository.saveGame(game);

    return {
        levelsGained: levelsGained,
        idGuardian: id
    }
}

async function updateEnergy(id, data) {
        const game = await repository.loadGame();

        const guardianIndex = game.guardians.findIndex(g => g.id == id);

        if (guardianIndex === -1) {
            throw new NotFoundError("Guardian not found");
        }

        const guardian = game.guardians[guardianIndex];

        guardian.energy = data.energy;

        game.guardians[guardianIndex] = guardian;

        await repository.saveGame(game);
        return guardian;
}

async function updateItems(id, data) {
    const game = await repository.loadGame();

    const guardianIndex = game.guardians.findIndex(g => g.id == id);

    if (guardianIndex === -1) {
        throw new NotFoundError("Guardian not found");
    }

    const guardian = game.guardians[guardianIndex];

    if (data.action == "add") {
        for (const item of data.items) {
            guardian.items.push(item);
        }

        game.guardians[guardianIndex] = guardian;
        await repository.saveGame(game);
        return guardian;
    }


    if (data.action == "remove") {
        const itemIndex = guardian.items.findIndex(i => i.name == data.itemName);

        if (itemIndex === -1) {
            throw new NotFoundError("Item not found");
        }

        guardian.items.splice(itemIndex, 1);
        game.guardians[guardianIndex] = guardian;
        await repository.saveGame(game);
        return guardian;
    }

    return "You needs to specify a action.";
}

module.exports = { getAll, createGuardian, updateEnergy, updateItems, upLevel, deleteGuardian };