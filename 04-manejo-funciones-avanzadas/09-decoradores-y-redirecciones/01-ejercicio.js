/*
El decorador es un contenedor alrededor de una función que altera su comportamiento. El trabajo principal todavía lo realiza la función.

Los decoradores se pueden ver como “características” o “aspectos” que se pueden agregar a una función. Podemos agregar uno o agregar muchos. 

Para implementar cachingDecorator, hemos estudiado los siguientes métodos:

func.call(context, arg1, arg2…) – llama a func con el contexto y argumentos dados.
func.apply(context, args) – llama a func, pasando context como this, y un símil-array args como lista de argumentos.
La redirección de llamadas genérica generalmente se realiza con apply:

let wrapper = function() {
  return original.apply(this, arguments);
};
También vimos un ejemplo de préstamo de método cuando tomamos un método de un objeto y lo “llamamos” (call) en el contexto de otro objeto. Es bastante común tomar métodos de array y aplicarlos al símil-array arguments. La alternativa es utilizar el objeto de parámetros rest, que es un array real.

*/

/*
Cree un decorador spy(func) que devuelva un contenedor el cual guarde todas las llamadas a la función en su propiedad calls

Cada llamada se guarda como un array de argumentos.

Por ejemplo

function work(a, b) {
  alert( a + b ); // work es una función o método arbitrario
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
P.D Ese decorador a veces es útil para pruebas unitarias. Su forma avanzada es sinon.spy en la librería Sinon.JS.
*/

//El contenedor devuelto por spy(f) debe almacenar todos los argumentos y luego usar f.apply para reenviar la llamada.

function spy(func) {

    function wrapper(...args) {
        // usamos ...args en lugar de arguments para almacenar un array "real" en wrapper.calls
        wrapper.calls.push(args);
        return func.apply(this, args);
    }

    wrapper.calls = [];

    return wrapper;
}