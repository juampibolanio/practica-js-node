function calculateFormula(formula, vars) {
    const keys = Object.keys(vars);
    const values  = Object.values(vars);

    const fn = new Function(...keys, `return ${formula}`);
    return fn(...values);
}