const fs = require("fs").promises;
const path = require("path");
const JsonInvalidError = require("../errors/InvalidJsonError");
const BaseError = require("../errors/BaseError");
const HttpStatus = require("../utils/HttpStatus");

const filePath = path.join(__dirname, "..", "spirit.json");

async function loadSpirit() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new JsonInvalidError();
        }
        throw new BaseError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}

async function saveSpirit(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new JsonInvalidError();
        }
        throw new BaseError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { loadSpirit, saveSpirit }