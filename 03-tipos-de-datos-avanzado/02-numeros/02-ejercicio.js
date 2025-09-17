/*
Crea una función readNumber que pida un número hasta que el visitante ingrese un valor numérico válido.

El valor resultante debe ser devuelto como number.

El visitante puede también detener el proceso ingresando una linea vacía o presionando “CANCEL”. En tal caso la función debe devolver null.
*/

function readNumber() {
    let num;

    do {
        num = prompt("Ingrese un número por favor:", 0);
    } while (!isFinite(num));

    if (num === null || num === '') return null;

    return +num;
}

alert(`Read: ${readNumber()}`);