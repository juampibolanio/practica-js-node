/*
Tratemos 5 operaciones de array.

Crear un array styles con los items “Jazz” y “Blues”.
Agregar “Rock-n-Roll” al final.
Reemplazar el valor en el medio por “Classics”. Tu código para encontrar el valor medio debe funcionar con cualquier array de longitud impar.
Quitar el primer valor del array y mostrarlo.
Anteponer Rap y Reggae al array.
El array durante el proceso:

Jazz, Blues
Jazz, Blues, Rock-n-Roll
Jazz, Classics, Rock-n-Roll
Classics, Rock-n-Roll
Rap, Reggae, Classics, Rock-n-Roll

*/

let styles = ["Jazz", "Blues"];
console.log(styles);

styles.push("Rock-n-Roll");
console.log(styles);

styles[Math.floor((styles.length - 1) / 2)] = "Classics";
console.log(styles);


console.log(styles.shift());
console.log(styles);

styles.unshift("Rap", "Reggae");

console.log(styles);