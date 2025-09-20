/*
Crea un decorador “limitador” o “throttling” throttle(f, ms) que devuelve un contenedor.

Cuando se llama varias veces, pasa la llamada a f como máximo una vez por ms milisegundos.

Comparado con el decorador debounce, el comportamiento es completamente diferente:

debounce ejecuta la función una vez después del período de enfriamiento. Es bueno para procesar el resultado final.
throttle la ejecuta una y no más veces por el tiempo de ms dado. Es bueno para actualizaciones regulares que no deberían ser muy frecuentes.
En otras palabras, “throttle” es como una secretaria que acepta llamadas telefónicas, pero molesta al jefe (llama a la “f” real) no más de una vez por ms milisegundos.

Revisemos una aplicación de la vida real para comprender mejor ese requisito y ver de dónde proviene.

Por ejemplo, queremos registrar los movimientos del mouse.

En un navegador, podemos configurar una función para que se ejecute en cada movimiento del mouse y obtener la ubicación del puntero a medida que se mueve. Durante un uso activo del mouse, esta función generalmente se ejecuta con mucha frecuencia, puede ser algo así como 100 veces por segundo (cada 10 ms). Nos gustaría actualizar cierta información en la página web cuando se mueve el puntero.

… Pero la función de actualización update() es demasiado pesada para hacerlo en cada micro-movimiento. Tampoco tiene sentido actualizar más de una vez cada 100 ms.

Entonces lo envolveremos en el decorador: para ejecutar en cada movimiento del mouse, usamos throttle(update, 100) en lugar del update() original. Se llamará al decorador con frecuencia, pero este reenviará la llamada a update() como máximo una vez cada 100 ms.

Visualmente, se verá así:

Para el primer movimiento del mouse, la variante decorada pasa inmediatamente la llamada a update. Esto es importante, el usuario ve nuestra reacción a su movimiento de inmediato.
Luego, a medida que el mouse avanza, hasta 100ms no sucede nada. La variante decorada ignora las llamadas.
Al final de 100ms – ocurre un update más con las últimas coordenadas.
Entonces, finalmente, el mouse se detiene en alguna parte. La variante decorada espera hasta que expiren 100ms y luego ejecuta update con las últimas coordenadas. Entonces, y esto es muy importante, se procesan las coordenadas finales del mouse.
Un código de ejemplo:

function f(a) {
  console.log(a);
}

// f1000 pasa llamadas a f como máximo una vez cada 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // muestra 1
f1000(2); // (throttling, 1000ms aún no)
f1000(3); // (throttling, 1000ms aún no)

// tiempo de espera de 1000 ms ...
// ...devuelve 3, el valor intermedio 2 fue ignorado
P.D. Los argumentos y el contexto this pasado a f1000 deben pasarse a la f original.
*/

function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
/* Una llamada a throttle(func, ms) devuelve el contenedor wrapper.

Durante la primera llamada, el wrapper solo ejecuta func y establece el estado de enfriamiento (isThrottled = true).
En este estado, todas las llamadas se memorizan en savedArgs/savedThis. Tenga en cuenta que tanto el contexto como los argumentos son igualmente importantes y deben memorizarse. Los necesitamos simultáneamente para reproducir la llamada.
Después de que pasan ms milisegundos, se activa setTimeout. El estado de enfriamiento se elimina (isThrottled = false) y, si ignoramos las llamadas, wrapper se ejecuta con los últimos argumentos y contexto memorizados.
El tercer paso no ejecuta func, sino wrapper, porque no solo necesitamos ejecutar func, sino que una vez más ingresamos al estado de enfriamiento y configuramos el tiempo de espera para restablecerlo.*/