/*
Escribe la función isEmpty(obj) que devuelva el valor true si el objeto no tiene propiedades, en caso contrario false.

Debería funcionar así:

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "Hora de levantarse";

alert( isEmpty(schedule) ); // false
*/

function isEmpty(obj) {

    let numKeys = 0;

    for (const key in obj) {
        if (key) { numKeys++ }
    }

    if (numKeys > 0) return false;

    return true;
}

let schedule = {};

console.log( isEmpty(schedule) ); // true

schedule["8:30"] = "Hora de levantarse";

console.log( isEmpty(schedule) ); // false

/* Otra solución...
function isEmpty(obj) {
  for (let key in obj) {
    //  Si el bucle ha comenzado quiere decir que sí hay al menos una propiedad
    return false;
  }
  return true;
}
*/