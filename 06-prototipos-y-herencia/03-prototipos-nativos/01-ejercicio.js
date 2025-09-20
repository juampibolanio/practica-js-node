/*
Todos los objetos integrados siguen el mismo patrón:
Los métodos se almacenan en el prototipo (Array.prototype, Object.prototype, Date.prototype, etc.)
El objeto en sí solo almacena los datos (elementos de arreglo, propiedades de objeto, la fecha)
Los primitivos también almacenan métodos en prototipos de objetos contenedores: Number.prototype, String.prototype y Boolean.prototype. Solo undefined y null no tienen objetos contenedores.
Los prototipos integrados se pueden modificar o completar con nuevos métodos. Pero no se recomienda cambiarlos. El único caso permitido es probablemente cuando agregamos un nuevo estándar que aún no es soportado por el motor de JavaScript.

Agregue al prototipo de todas las funciones el método defer(ms), que ejecuta la función después de ms milisegundos.

Después de hacerlo, dicho código debería funcionar:

function f() {
  alert("Hola!");
}

f.defer(1000); // muestra "Hola!" después de 1 segundo
*/

function f() {
    console.log("Hola!");
}

Function.prototype.defer = function(ms) {
    setTimeout(this, ms);
}


f.defer(1000); // muestra "Hola!" después de 1 segundo