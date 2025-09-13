/*
Aquí hay un código que le pide al usuario dos números y muestra su suma.

Funciona incorrectamente. El resultado en el ejemplo a continuación es 12 (para valores de captura predeterminados).

¿Por qué? Arreglalo. El resultado debería ser 3.

let a = prompt("¿Primer número?", 1);
let b = prompt("¿Segundo número?", 2);

alert(a + b); // 12
*/


/* let a = prompt("¿Primer número?", 1);
let b = prompt("¿Segundo número?", 2);

alert(a + b); // 12
*/

// correccion

let a = Number(prompt("¿Primer número?"), 1);
let b = Number(prompt("¿Segundo número?", 2));

alert(a + b);

/*
    Otras formas

    let a = +prompt("¿Primer número?", 1);
    let b = +prompt("¿Segundo número?", 2);

    alert(a + b); // 3


    let a = prompt("¿Primer número?", 1);
    let b = prompt("¿Segundo número?", 2);

    alert(+a + +b); // 3
*/