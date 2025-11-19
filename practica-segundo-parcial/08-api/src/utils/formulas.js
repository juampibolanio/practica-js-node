function calculateFormula(formula, vars) {

    const keys = Object.keys(vars);
    const values = Object.values(vars);

    const fn = new Function(...keys, `return ${formula}`);

    return fn(...values);
}

function calculatePower(level, xp, energy, items) {

    const itemsPower = items.reduce(( total, item ) => total + item.power);

    const totalPower = level * 2 + (xp / 5) + energy + itemsPower;

    return totalPower;
}


module.exports = { calculateFormula, calculatePower }