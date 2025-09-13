/*
¿Cuáles son los valores de ‘a’ y ‘x’ después del código a continuación?

let a = 2;

let x = 1 + (a *= 2);
*/

let a = 2;

let x = 1 + (a *= 2);

console.log(2); // antes de la operacion a = 2
console.log(4); // (a*=2)
console.log(5); // luego de la operacion 1 + (a*=2)