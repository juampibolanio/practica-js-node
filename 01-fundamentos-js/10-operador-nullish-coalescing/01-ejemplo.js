/*
El operador “nullish coalescing” (fusión de null) se escribe con un doble signo de cierre de interrogación ??.

Como este trata a null y a undefined de forma similar, usaremos un término especial para este artículo. Diremos que una expresión es “definida” cuando no es null ni undefined.

El resultado de a ?? b:

si a está “definida”, será a,
si a no está “definida”, será b.
Es decir, ?? devuelve el primer argumento cuando este no es null ni undefined. En caso contrario, devuelve el segundo.

El operador “nullish coalescing” no es algo completamente nuevo. Es solamente una sintaxis agradable para obtener el primer valor “definido” de entre dos.

*/

let user;

alert(user ?? "Anonymous"); // Anonymous (user es undefined)

let user2 = "John";

alert(user ?? "Anonymous"); // John (user no es null ni undefined)

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// Muestra el primer valor definido:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder


// comparacion con ||
let firstName1 = null;
let lastName1 = null;
let nickName1 = "Supercoder";

// muestra el primer valor "verdadero":
alert(firstName1 || lastName1 || nickName1 || "Anonymous"); // Supercoder