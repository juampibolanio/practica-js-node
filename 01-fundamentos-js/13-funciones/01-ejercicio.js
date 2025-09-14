/*
La siguiente función devuelve true si el parámetro age es mayor a 18.

De lo contrario, solicita una confirmación y devuelve su resultado:

function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    // ...
    return confirm('¿Tus padres te permitieron?');
  }
}
¿Funcionará la función de manera diferente si se borra else?

function checkAge(age) {
  if (age > 18) {
    return true;
  }
  // ...
  return confirm('¿Tus padres te permitieron?');
}
*/

// funcionaría igual la función, ya que en caso de no entrar en la sentencia IF, devolvería el próximo return que es el "confirm"