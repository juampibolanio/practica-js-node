function calculateFormula(formula, vars) {
    const keys = Object.keys(vars);
    const values = Object.values(vars);

    const fn = new Function(...keys, `return ${formula}`);

    return fn(...values);
}

function calculatePower(rank, xp, energy, artifacts) {

    const powerItems = artifacts.reduce((total, artifact) => total + artifact.power);

    const totalPower = rank ** 2 + (xp / 4) + energy + powerItems;

    return totalPower;
}

module.exports = { calculateFormula, calculatePower }