const repository = require("../repository/lab.repository");
const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");
const { calculateXpFormula } = require("../utils/formulas");
const automataService = require("./automata.service");

async function getAllMisions() {
    const lab = await repository.loadLab();
    const misions = lab.missions;
    return misions;
}

async function createMision(data) {
    const lab = await repository.loadLab();

    const newMision = {
        id: crypto.randomUUID(),
        title: data.title,
        complexity: data.complexity,
        energyCost: data.energyCost,
        rewardFormula: data.rewardFormula,
        requiredProtocol: data.requiredProtocol
    }

    lab.missions.push(newMision);
    await repository.saveLab(lab);
    return newMision;
}

async function attemptMision(idAutomata, idMision) {
    const lab = await repository.loadLab();

    const automata = lab.automatons.find(a => a.id == idAutomata);

    const mision = lab.missions.find(m => m.id == idMision);

    if (!automata || !mision) {
        throw new NotFoundError("No se encontró el autómata o misión con esa ID");
    }

    if (automata.energy < mision.energyCost) {
        throw new Error("El autómata no tiene energía suficiente");
    }

    // descuento la energia
    automata.energy -= 10;

    if (!automata.protocols.includes(mision.requiredProtocol)) {
        throw new Error("El autómata no tiene el protocolo requerido para hacer la misión.");
    }

    // calculo posible ganancia de experiencia
    const possibleXpGained = calculateXpFormula(mision.rewardFormula, {complexity: mision.complexity, energyCost: mision.energyCost});

    // verifico si falla o completa la mision
    let result;

    // si falla
    if (mision.complexity > automata.level * 2) {

        const penalizated = mision.complexity * 4
        automata.energy -= penalizated;

        result = {
            idAutomata: idAutomata,
            idMision: idMision,
            status: "failed"
        }

        lab.attemps.push(result)
        await repository.saveLab(lab);
        return result;
    }
    
    // si no falla

    // subo de nivel si alcanza la xp
    const levelsGained = await automataService.upLevel(idAutomata, possibleXpGained);

    result = {
        idAutomata: idAutomata,
        idMision: idMision,
        status: "success",
        xpGained: possibleXpGained,
        levelsGained: levelsGained,
    }
    lab.attempts.push(result);
    await repository.saveLab(lab);
    return result;
}
