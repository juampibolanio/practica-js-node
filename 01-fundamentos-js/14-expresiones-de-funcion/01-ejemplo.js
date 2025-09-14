/*
En JavaScript, una función no es una “estructura mágica del lenguaje”, sino un tipo de valor especial.

La sintaxis que usamos antes se llama Declaración de Función:

function sayHi() {
  alert( "Hola" );
}
Existe otra sintaxis para crear una función que se llama una Expresión de Función.

Esto nos permite crear una nueva función en el medio de cualquier expresión

Por ejemplo:

let sayHi = function() {
  alert( "Hola" );
};
Aquí podemos ver una variable sayHi obteniendo un valor —la nueva función— creada como function() { alert("Hello"); }.

Como la creación de una función ocurre en el contexto de una expresión de asignación, (el lado derecho de =), esto es una Expresión de función.

Note que no hay un nombre después de la palabra clave function. Omitir el nombre está permitido en las expresiones de función.

Aquí la asignamos directamente a la variable, así que el significado de estos ejemplos de código es el mismo: “crear una función y ponerla en la variable sayHi”.

En situaciones más avanzadas, que cubriremos más adelante, una función puede ser creada e inmediatamente llamada o agendada para uso posterior, sin almacenarla en ningún lugar, permaneciendo así anónima.
*/