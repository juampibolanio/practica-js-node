/*
También podemos asignar un método a la clase como un todo. Dichos métodos se llaman estáticos.

En la declaración de una clase, se preceden por la palabra clave static:

class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // verdadero
Eso realmente hace lo mismo que asignarlo como una propiedad directamente:

class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // verdadero
El valor de this en la llamada User.staticMethod() es el mismo constructor de clase User (la regla “objeto antes de punto”).

Por lo general, los métodos estáticos se utilizan para implementar funciones que pertenecen a la clase como un todo, no a un objeto particular de la misma.

*/

/*

Como sabemos, todos los objetos normalmente heredan de Object.prototype y obtienen acceso a métodos de objeto “genéricos” como hasOwnProperty etc.

Por ejemplo:

class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// el método hasOwnProperty proviene de Object.prototype
alert( rabbit.hasOwnProperty('name') ); // verdadero
Pero si lo escribimos explícitamente como "class Rabbit extends Object", entonces ¿el resultado sería diferente de una simple "class Rabbit"?

¿Cuál es la diferencia?

Aquí un ejemplo de dicho código (no funciona – ¿por qué? ¿Arréglalo?):

class Rabbit extends Object {
  constructor(name) {
    super() -> Agregue estoo
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
*/