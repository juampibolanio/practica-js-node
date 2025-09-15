/*
¿Es posible crear las funciones A y B para que se cumpla new A() == new B()?

function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
Si es posible, entonces proporcione un ejemplo de su código.
*/

/*
Si, es posible.

Si una función devuelve un objeto, entonces new lo devuelve en vez de this.

Por lo tanto pueden, por ejemplo, devolver el mismo objeto definido externamente obj:
*/

let obj = {};

function A() { return obj; }
function B() { return obj; }

console.log( new A() == new B() );