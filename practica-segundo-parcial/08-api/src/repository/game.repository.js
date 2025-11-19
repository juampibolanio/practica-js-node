const fs = require ("fs").promises;
const path = require ("path");
const InvalidJsonError = require("../errors/InvalidJsonError");
const BaseError = require("../errors/BaseError");

const filePath = path.join(__dirname, "..", "game.json");

async function loadGame() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new InvalidJsonError();
        }
        throw new BaseError(`Error loading game: ${error}`);
    }
}

async function saveGame(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new InvalidJsonError();
        }
        throw new BaseError(`Error loading game: ${error}`);
    }
}

module.exports = { loadGame, saveGame };