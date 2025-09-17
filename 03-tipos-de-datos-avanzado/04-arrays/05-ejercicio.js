/*
La entrada es un array de números, por ejemplo arr = [1, -2, 3, 4, -9, 6].

La tarea es encontrar, dentro de ’arr’, el subarray de elementos contiguos que tenga la suma máxima.

Escribe la función getMaxSubSum(arr) que devuelva el resultado de tal suma.

Por ejemplo:

getMaxSubSum([-1, 2, 3, -9]) == 5 (la suma de items resaltados)
getMaxSubSum([2, -1, 2, 3, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, 11]) == 11
getMaxSubSum([-2, -1, 1, 2]) == 3
getMaxSubSum([100, -9, 2, -3, 5]) == 100
getMaxSubSum([1, 2, 3]) == 6 (toma todo)
Si todos los elementos son negativos, no toma ninguno (el subarray queda vacío) y la suma es cero:

getMaxSubSum([-1, -2, -3]) = 0
Trata de pensar en una solución rápida: O(n2), o incluso O(n) si puedes.
 */

let arr = [1, -2, 3, 4, -9, 6];

function getMaxSubSum(array) {

    let maxSum = 0;
    let partialSum = 0;

    for (const number of array) {
        partialSum += number;
        maxSum = Math.max(maxSum, partialSum);
        
        if (partialSum < 0) {
            partialSum = 0;
        }
    }

    return maxSum;

}

