// fórmulas para recompensas de desafíos
function calculateXpFormula(formula, {difficulty, energyCost}) {
    const fn = new Function("difficulty", "energyCost", `return ${formula}`);
    return fn(difficulty, energyCost);
}

// fórmulas para duelos
function calculateWinnerFormula(level, xp, energy, items) {
    
    let itemsPower = items.reduce((total, item) => total + item.power, 0);
    let power = level * 2 + (xp / 5) + energy + itemsPower;

    return power;
}

function calculateDifferencePower(power1, power2) {
    return Math.abs(power1 - power2);
}

module.exports = { calculateXpFormula, calculateWinnerFormula, calculateDifferencePower }

