/*
La construcción try...catch permite manejar errores de tiempo de ejecución. Literalmente permite “intentar (try)” ejecutar el código y “atrapar (catch)” errores que pueden ocurrir en él.

La sintaxis es:

try {
  // ejecuta este código
} catch (err) {
  // si ocurrió un error, entonces salta aquí
  // err es el objeto error
} finally {
  // hacer en cualquier caso después de try/catch
}
Puede que no haya una sección catch o finally, por lo que las construcciones más cortas try...catch y try...finally también son válidas.

Los objetos Error tienen las siguientes propiedades:

message – el mensaje de error legible por humanos.
name – la cadena con el nombre del error (nombre del constructor de error).
stack (No estándar, pero bien soportado) – la pila en el momento de la creación del error.
Si no se necesita un objeto error, podemos omitirlo usando catch { en lugar de catch (err) {.

También podemos generar nuestros propios errores utilizando el operador throw. Técnicamente, el argumento de throw puede ser cualquier cosa, pero generalmente es un objeto error heredado de la clase incorporada Error. Más sobre la extensión de errores en el próximo capítulo.

Relanzado (rethrowing) es un patrón muy importante de manejo de errores: un bloque catch generalmente espera y sabe cómo manejar el tipo de error en particular, por lo que debería relanzar errores que no conoce.

Incluso si no tenemos try...catch, la mayoría de los entornos nos permiten configurar un controlador de errores “global” para detectar los errores que caigan. En el navegador, eso es window.onerror.
*/


/*
Compara los dos fragmentos de código.

El primero usa finally para ejecutar el código después de try..catch:

try {
  trabajo trabajo
} catch (err) {
  maneja errores
} finally {
  limpiar el espacio de trabajo
}
El segundo fragmento coloca la limpieza justo después de try..catch:

try {
  trabajo trabajo
} catch (err) {
  manejo de errores
}

limpiar el espacio de trabajo
Definitivamente necesitamos la limpieza después del trabajo, no importa si hubo un error o no.

¿Hay alguna ventaja aquí en usar finally o ambos fragmentos de código son iguales? Si existe tal ventaja, entonces da un ejemplo cuando sea importante.
*/