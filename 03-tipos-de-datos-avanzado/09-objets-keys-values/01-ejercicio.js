/*
Hay un objeto salaries con un número arbitrario de salarios.

Escriba la función sumSalaries(salaries) que devuelva la suma de todos los salarios utilizando Object.values y el bucle for..of.

Si salaries está vacío, entonces el resultado debe ser 0.

Por ejemplo:

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
*/

function sumSalaries(salaries) {
    
    let sum = 0

    if (salaries.length < 1) {
        return 0;
    }

    for (const salary of Object.values(salaries)) {
        sum += salary;
    }

    return sum;
}

function sumSalaries2(salaries) { // otra forma 
    return Object.values(salaries).reduce((a, b) => a + b, 0);
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

console.log(sumSalaries(salaries));