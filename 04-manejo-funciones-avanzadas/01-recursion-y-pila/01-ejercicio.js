/*
Escribe una función sumTo(n) que calcule la suma de los números 1 + 2 + ... + n.
Por ejemplo:

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
Escribe 3 soluciones diferentes:

Utilizando un bucle for.
Usando la recursividad, pues sumTo(n) = n + sumTo(n-1) para n > 1.
Utilizando la fórmula de progresión aritmética.
Un ejemplo del resultado:

function sumTo(n) { /*... tu código ... }

alert( sumTo(100) ); // 5050
*/

function sumTo(n){

    let sum = 0;

    for (let i = 1; i <= n; i++) {
        
        sum += i;
        
    }

    return sum;
}

console.log(sumTo(3));

function sumToR(n) {

    if (n == 1) {
        return 1;
    }
    return n + sumTo(n-1);

}

console.log(sumToR(3));