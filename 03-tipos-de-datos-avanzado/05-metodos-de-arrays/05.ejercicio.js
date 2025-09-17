/*
Supongamos que tenemos un array arr. Nos gustaría tener una copia ordenada del mismo, pero mantener arr sin modificar.

Crea una función copySorted(arr) que devuelva esa copia.

let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (sin cambios)
*/

let arr = ["HTML", "JavaScript", "CSS"];

function copySorted(arr) {

    return arr.sort();
}

console.log(copySorted(arr));