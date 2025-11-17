const fs = require("fs").promises;
const path = require("path");
const InvalidJsonError = require("../errors/InvalidJsonError");

const filePath = path.join(__dirname, "..", "lab.json");

async function loadLab() {
    try {
        const data = await fs.readFile(filePath, "utf-8" );
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new InvalidJsonError();
        }
        throw error;
    }
}

async function saveLab(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new InvalidJsonError();
        }
        throw error;
    }
}

module.exports = { loadLab, saveLab };