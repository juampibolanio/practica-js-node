/*
Escribe una función getSecondsToday() que devuelva la cantidad de segundos transcurridos desde el comienzo del día.

Por ejemplo, si en este momento fueran las 10:00 am, sin horario de verano, entonces:

getSecondsToday() == 36000 // (3600 * 10)
La función debe poder funcionar correctamente cualquier día. Es decir, no debe poseer valores fijos en el código, como por ej. “today”.
*/

function getSecondsToday() {

    let now = new Date();

    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let diff = now - today;

    return Math.round(diff / 1000);
}