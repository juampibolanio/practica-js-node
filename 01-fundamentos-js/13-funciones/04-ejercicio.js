/*
Escriba la función pow(x,n) que devuelva x como potencia de n. O, en otras palabras, multiplique x por si mismo n veces y devuelva el resultado.

pow(3, 2) = 3 * 3 = 9
pow(3, 3) = 3 * 3 * 3 = 27
pow(1, 100) = 1 * 1 * ...* 1 = 1

*/

function pow(x, n) {
    let result = x;

    for (let i = 1; i < n; i++) {
        result *= x;

    }
    return result;
}

console.log(pow(3, 3));