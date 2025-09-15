/*
Tenemos un objeto que almacena los salarios de nuestro equipo:

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
Escribe el código para sumar todos los salarios y almacenar el resultado en la variable sum. En el ejemplo de arriba nos debería dar 390.

Si salaries está vacío entonces el resultado será 0.
*/

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

function sumSalaries(salaries)  {

    if (isEmpty(salaries)) {
        return 0;
    }

    let sum = 0;

    for (const key in salaries) {
        
        sum += salaries[key];
        
    }

    return sum;
}

console.log(sumSalaries(salaries));

/* Otra forma...
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let sum = 0;
for (let key in salaries) {
  sum += salaries[key];
}

alert(sum); // 390
*/