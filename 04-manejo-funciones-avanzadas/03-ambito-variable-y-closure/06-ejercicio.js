/*
Escriba la función sum que funcione así: sum(a)(b) = a+b.

Sí, exactamente de esta manera, usando paréntesis dobles (no es un error de tipeo).

Por ejemplo:

sum(1)(2) = 3
sum(5)(-1) = 4
*/

function sum(n1) {

    return function(n2) {
        return n1 + n2;
    }

}

console.log(sum(1)(2));