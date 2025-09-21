/*

        trabajapara retorna
typeof	primitivos	cadena
{}.toString	primitivos, objetos incorporados, objetos con Symbol.toStringTag	cadena
instanceof	objetos	true/false

En el siguiente código, ¿por qué instanceof devuelve true? Podemos ver fácilmente que a no es creado por B().

function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); // verdadero

*/

function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); 

/*
Sí, se ve extraño de hecho.

Pero a instanceof no le importa la función, sino más bien su prototype, que coincide con la cadena del prototipo.

Y aquí a.__ proto__ == B.prototype, entonces instanceof devuelve true.

Entonces, según la lógica de instanceof, el prototype en realidad define el tipo, no la función constructora.

*/