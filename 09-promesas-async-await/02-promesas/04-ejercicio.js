/*
Vuelva a escribir la función showCircle en la solución de la tarea Círculo animado con función de callback para que devuelva una promesa en lugar de aceptar un callback.

Nueva forma de uso:

showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hola, mundo!");
});
*/

showCircle(150, 150, 100, div => {
    div.classList.add('message-ball');
    div.append("Hola, mundo!");
});


function showCircle(cx, cy, radius, div ) {

    return new Promise((resolve, reject) => {
        resolve(div => { div.classList.add('message-ball');
                        div.append("Hola, mundo!");
        })
    })
}