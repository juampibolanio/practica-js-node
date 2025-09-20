/*
Agregue el decorado "defer()" a las funciones
importancia: 4
Agregue el método defer(ms) al prototipo de todas las funciones, que devuelve un contenedor, retrasando la llamada en ms milisegundos.

Aquí hay un ejemplo de cómo debería funcionar:

function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // muestra 3 después de 1 segundo
Tenga en cuenta que los argumentos deben pasarse a la función original.
*/

Function.prototype.defer = function (ms) {
    let f = this;
    return function (...args) {
        setTimeout(() => f.apply(this, args), ms);
    }
};

function f(a, b) {
    alert(a + b);
}

f.defer(1000)(1, 2); // muestra 3 después de 1 seg