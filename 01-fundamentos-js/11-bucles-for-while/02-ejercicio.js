/*
Para cada iteración del bucle, escribe qué valor será impreso y luego compáralo con la solución.

Ambos bucles ¿alertan los mismos valores?

La forma de prefijo ++i:

let i = 0;
while (++i < 5) alert( i );
La forma de sufijo i++

let i = 0;
while (i++ < 5) alert( i );
*/

// La forma de prefijo ++i:
let i = 0;
while (++i < 5) alert( i ); // esto devuelve, 1, 2, 3, 4 

//La forma de sufijo i++

let y = 0;
while (y++ < 5) alert( y );  // esto devuelve 1, 2, 3, 4, 5