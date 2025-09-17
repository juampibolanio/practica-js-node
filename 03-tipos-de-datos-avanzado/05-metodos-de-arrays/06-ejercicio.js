/*
Tienes un array de objetos user, cada uno tiene user.name. Escribe el código que lo convierta en un array de nombres.

Por ejemplo:

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names =  ... tu código 

alert( names ); // John, Pete, Mary
*/

let users = [
            { name: "John", age: 25 },
            { name: "Pete", age: 30 },
            { name: "Mary", age: 28 }
        ];

let names = users.map(user => user.name);

console.log(names);