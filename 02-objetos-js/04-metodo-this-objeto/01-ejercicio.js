/*
Aquí la función makeUser devuelve un objeto.

¿Cuál es el resultado de acceder a su ref? ¿Por qué?

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // ¿Cuál es el resultado?

*/

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); 

/*
Esto es porque las reglas que establecen el this no buscan en la definición del objeto. Solamente importa el momento en que se llama.

Aquí el valor de this dentro de makeUser() es undefined, porque es llamado como una función, no como un método con sintaxis de punto.

El valor de this es uno para la función entera; bloques de código y objetos literales no lo afectan.

Entonces ref: this en realidad toma el this actual de la función.

Aquí está el caso opuesto:

function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}

let user = makeUser();

alert( user.ref().name ); // John
Ahora funciona, porque user.ref() es un método. Y el valor de this es establecido al del objeto delante del punto ..
*/