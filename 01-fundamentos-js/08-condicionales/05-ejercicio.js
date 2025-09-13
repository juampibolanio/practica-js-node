/*
Reescriba el if..else utilizando operadores ternarios múltiples'?'.

Para mejor legibilidad, se recomienda dividirlo en múltiples lineas de código.

let message;

if (login == 'Empleado') {
  message = 'Hola';
} else if (login == 'Director') {
  message = 'Felicidades';
} else if (login == '') {
  message = 'Sin sesión';
} else {
  message = '';
}
*/

let message;

message = (login == 'Empleado') ? 'Hola' :
        (login == 'Director') ? "Felicidades" :
        (login == '') ? "Sin sesión" : 
        "";