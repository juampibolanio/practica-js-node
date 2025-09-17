/*
Nos gustaría obtener un array de map.keys() en una variable y luego aplicarle métodos específicos de array, ej. .push.

Pero eso no funciona:

let map = new Map();

map.set("name", "John");

let keys = map.keys();

// Error: keys.push no es una función
keys.push("more");
*/

let map = new Map();

map.set("name", "John");

let keys = map.keys();

// Error: keys.push no es una función
keys = Array.from(keys);

console.log(keys);

keys.push("more");

console.log(keys);