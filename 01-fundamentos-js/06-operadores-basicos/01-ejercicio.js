/*
Las formas sufijo y prefijo
importancia: 5
¿Cuáles son los valores finales de todas las variables a, b, c y d después del código a continuación?

let a = 1, b = 1;

let c = ++a; // ?
let d = b++; // ?
*/

let a = 1, b = 1;

let c = ++a; // 2
let d = b++; // 1


alert( ++a ); // 2, la forma de prefijo devuelve el nuevo valor
alert( b++ ); // 1, la forma de sufijo devuelve el antiguo valor

alert( a ); // 2, incrementado una vez
alert( b ); // 2, incrementado una vez