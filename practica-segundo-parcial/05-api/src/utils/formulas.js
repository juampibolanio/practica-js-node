function calculateXpFormula(formula, {complexity, energyCost}) {
    const fn = new Function("complexity", "energyCost", `return ${formula}`);
    return fn(complexity, energyCost);
}

module.exports = { calculateXpFormula };

function calculateFormula(formula, vars) {
    const keys = Object.keys(vars);
    const values = Object.keys(vars);

    const fn = new Function(...keys, `return ${formula};`);

    return fn(...values);
}