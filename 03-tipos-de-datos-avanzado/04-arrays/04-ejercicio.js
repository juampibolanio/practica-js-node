/*
Escribe una función sumInput() que:

Pida al usuario valores usando prompt y los almacene en el array.
Termine de pedirlos cuando el usuario ingrese un valor no numérico, una cadena vacía, o presione “Escape”.
Calcule y devuelva la suma de los items del array.
P.D. Un cero 0 es un número válido, por favor no detengas los ingresos con el cero.
*/

// lo hice con node js, no con el navegador
function sumInput(...numbers) {
    
    if (numbers.length === 0) {
        return;
    }

    let suma = 0;

    for (const number of numbers) {
        suma += number;
    }

    return suma;
}

console.log(sumInput(2, 5, 3));