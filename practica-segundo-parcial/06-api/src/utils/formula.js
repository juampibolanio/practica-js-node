function calculateFormula(formula, vars) {
    const keys = Object.keys(vars);
    const values = Object.values(vars);
    
    const fn = new Function(...keys, `return ${formula}`);

    return fn(...values);
}

function calculatePower(rank, xp, energy, catalylists) {
    let cataltystPower = catalylists.reduce((total, catalyst) => total + catalyst.potency);
    let totalPower = rank ** 2 + (xp / 3) + energy + cataltystPower;

    return totalPower;
}

module.exports = { calculateFormula, calculatePower };