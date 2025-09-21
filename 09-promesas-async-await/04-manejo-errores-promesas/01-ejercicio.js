/*
.catch maneja errores de todo tipo: ya sea una llamada a reject(), o un error que arroja un manejador.
.then también atrapa los errores de la misma manera si se le da el segundo argumento (que es el manejador de error).
Debemos colocar .catch exactamente en los lugares donde queremos manejar los errores y saber cómo manejarlos. El manejador debe analizar los errores (los errores personalizados ayudan), y relanzar los errores desconocidos (tal vez sean errores de programación).
Es correcto no usar .catch en absoluto si no hay forma de recuperarse de un error.
En cualquier caso, deberíamos tener el evento unhandledrejection (para navegadores, o el equivalente en otros entornos) para monitorear errores no manejados e informar al usuario (y probablemente al servidor) para que nuestra aplicación nunca “simplemente muera”.


¿Qué crees que pasará? ¿Se disparará el .catch? Explica tu respuesta.

new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

La respuesta es: no, no lo hará:
Como vimos en el capítulo, hay un “try..catch implícito” en el código de la función. Así se manejan todos los errores síncronos.
Pero aquí el error no se genera mientras el ejecutor está corriendo, sino más tarde. Entonces la promesa no puede manejarlo.
*/