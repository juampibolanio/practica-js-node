const fs = require("fs").promises;
const path = require("path");
const JsonInvalidError = require("../errors/JsonInvalidError");
const BaseError = require("../errors/BaseError");

const pathFile = path.join(__dirname, "..", "arcane.json");

async function loadArcane() {
    try {
        const data = await fs.readFile(pathFile, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new JsonInvalidError();
        }
        throw new BaseError(error.message);
    }
}

async function saveArcane(data) {
    try {
        await fs.writeFile(pathFile, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new JsonInvalidError();
        }
        throw new BaseError(error.message);
    }
}

module.exports = { loadArcane, saveArcane }