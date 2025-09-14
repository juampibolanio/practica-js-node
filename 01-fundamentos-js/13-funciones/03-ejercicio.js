/*
Escriba una función min(a,b) la cual devuelva el menor de dos números a y b.

Por ejemplo:

min(2, 5) == 2
min(3, -1) == -1
min(1, 1) == 1

*/

function checkMinNumber(a, b) {

    if (a > b) {
        return a;
    }

    return b;
}

function minNumber(a, b) {

    return (a > b) ? a : b;
}