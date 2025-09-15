/*
Escribe el código, una línea para cada acción:

Crea un objeto user vacío.
Agrega la propiedad name con el valor John.
Agrega la propiedad surname con el valor Smith.
Cambia el valor de name a Pete.
Remueve la propiedad name del objeto.
*/

let user = {};

user["name"] = "John";
user["surname"] = "Smith";

user.name = "Pete";
console.log(user.name);

delete user.name;
console.log(user);