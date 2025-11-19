const repository = require("../repository/nexus.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");

async function getAllRobots() {
    const nexus = await repository.loadNexus();
    return nexus.robots;
}

async function createRobot(data) {
    const nexus = await repository.loadNexus();

    const newRobot = {
        id: crypto.randomUUID(),
        model: data.model,
        durability: 100,
        powerBase: data.powerBase,
        components: data.components ? data.components : [],
    }

    nexus.robots.push(newRobot);
    await repository.saveNexus(nexus);
    return newRobot;
}

async function updateComponents(id, data) {
    const nexus = await repository.loadNexus();

    console.log(id);
    console.log(data);
    const robotIndex = nexus.robots.findIndex(r => r.id == id);

    if (robotIndex === -1) {
        throw new NotFoundError("No se encontró el robot con la id indicada");
    }

    const robot = nexus.robots[robotIndex];

    if (data.action == "add") {
        for (const component of data.items) {
            robot.components.push(component);
        }

        nexus.robots[robotIndex] = robot;
        await repository.saveNexus(nexus);
        return robot;
    }

    if (data.action == "remove") {
        const componentIndex = robot.components.findIndex(c => c.name == data.componentName);

        if (componentIndex === -1) {
            throw new NotFoundError("El robot no tiene el componente indicado");
        }

        robot.components.splice(componentIndex, 1);

        nexus.robots[robotIndex] = robot;
        await repository.saveNexus(nexus);
        return robot;
    }

    return "Se debe indicar que acción realizar: add, remove";
}

module.exports = { getAllRobots, createRobot, updateComponents };