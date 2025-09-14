/*
Escribe un código que pregunte por el inicio de sesión con propmt.

Si el visitante ingresa "Admin", entonces debe pedir una contraseña (con un nuevo propmt). Si la entrada es una linea vacía o Esc, entonces muestra “Cancelado.”. Si es otra cadena de texto, entonces muestra “No te conozco”.

La contraseña se comprueba de la siguiente manera:

Si es igual a “TheMaster”, entonces muestra “Bienvenido!”,
Si es otra cadena de texto, muetra “Contraseña incorrecta”,
Para una cadena de texto vacía o una entrada cancelada, muestra “Cancelado.”
El esquema:


Por favor usa bloques anidados de if. Piensa en la legibilidad general del código.

Pista: si se le pasa una entrada vacía a un prompt, retorna una cadena de texto vacía ''. Presionando ESC durante un prompt retorna null.
 */

let username;
let password;

username = prompt("Ingrese su rol: ", '');

if (username == 'Admin') {
    password = prompt("Ingrese su contraseña: ", '');

    if (password == "TheMaster") {
        alert("Bienvenido!");
    } else if (password === null || password === '') {
        alert("Cancelado");
    } else {
        alert("Contraseña incorrecta");
    }
} 
else if (username === null || username === '') {
    alert("Cancelado");
} else {
    alert("No te conozco");
}