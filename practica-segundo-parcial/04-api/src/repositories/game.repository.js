const fs = require("fs").promises;
const path = require("path");
const InvalidJson = require("../errors/InvalidJson");

const filePath = path.join(__dirname, "..", "game.json");

async function loadGame() {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new InvalidJson();
        }

        throw error;
    }
}

async function saveGame(game) {
    await fs.writeFile(
        filePath,
        JSON.stringify(game, null, 2),
        "utf8"
    );
}

module.exports = { loadGame, saveGame };