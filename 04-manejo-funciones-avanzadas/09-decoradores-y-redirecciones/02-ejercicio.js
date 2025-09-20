/*
El resultado del decorador debounce(f, ms) es un contenedor que suspende las llamadas a f hasta que haya ms milisegundos de inactividad (sin llamadas, “período de enfriamiento”), luego invoca f una vez con los últimos argumentos.

En otras palabras, debounce es como una secretaria que acepta “llamadas telefónicas” y espera hasta que haya ms milisegundos de silencio. Y solo entonces transfiere la información de la última llamada al “jefe” (llama a la “f” real).

Por ejemplo, teníamos una función f y la reemplazamos con f = debounce(f, 1000).

Entonces, si la función contenedora se llama a 0ms, 200ms y 500ms, y luego no hay llamadas, entonces la ‘f’ real solo se llamará una vez, a 1500ms. Es decir: después del período de enfriamiento de 1000 ms desde la última llamada.


*/

let f = _.debounce(alert, 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);
// la función debounce espera 1000 ms después de la última llamada y luego ejecuta: alert ("c")