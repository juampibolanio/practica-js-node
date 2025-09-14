/*
Un número entero mayor que 1 es llamado primo si no puede ser dividido sin un resto por ningún número excepto 1 y él mismo.

En otras palabras, n > 1 es un primo si no puede ser divido exactamente por ningún número excepto 1 y n.

Por ejemplo, 5 es un primo, porque no puede ser divido exactamente por 2, 3 y 4.

Escribe el código que muestre números primos en el intervalo de 2 a n.

Para n = 10 el resultado será 2, 3, 5, 7.

PD. El código debería funcionar para cualquier n, no debe estar programado para valores fijos.
*/

let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // por cada i

  for (let j = 2; j < i; j++) { // busco un divisor
    if (i % j == 0) continue nextPrime; // no es primo, ir al próximo i
  }

  alert( i ); // primo
}