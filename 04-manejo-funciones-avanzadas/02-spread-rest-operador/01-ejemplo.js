/*
Parámetros Rest ...
Una función puede ser llamada con cualquier número de argumentos sin importar cómo sea definida.

Por ejemplo::

function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
No habrá ningún error por “exceso” de argumentos. Pero, por supuesto, en el resultado solo los dos primeros serán tomados en cuenta, entonces el resultado del código anterior es 3.

El resto de los parámetros pueden ser referenciados en la definición de una función con 3 puntos ... seguidos por el nombre del array que los contendrá. Literalmente significan “Reunir los parámetros restantes en un array”.

Por ejemplo, para reunir todos los parámetros en un array args:

function sumAll(...args) { // args es el nombre del array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
Podemos elegir obtener los primeros parámetros como variables, y juntar solo el resto.

Aquí los primeros dos argumentos van a variables y el resto va al array titles:

function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julio Cesar

  // el resto va en el array titles
  // por ejemplo titles = ["Cónsul", "Emperador"]
  alert( titles[0] ); // Cónsul
  alert( titles[1] ); // Emperador
  alert( titles.length ); // 2
}

showName("Julio", "Cesar", "Cónsul", "Emperador");
Los parámetros rest deben ir al final
Los parámetros rest recogen todos los argumentos sobrantes, por lo que el siguiente código no tiene sentido y causa un error:

function f(arg1, ...rest, arg2) { // arg2 después de ...rest ?!
  // error
}
...rest debe ir siempre último.


----------------------------------------------------------


Sintaxis Spread

Cuando ...arr es usado en el llamado de una función, “expande” el objeto iterable arr en una lista de argumentos.

Para Math.max:

let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread convierte el array en una lista de argumentos)

--------

Incluso podemos combinar el operador spread con valores normales:

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
Además, el operador spread puede ser usado para combinar arrays:

let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, luego arr, después 2, después arr2)

---------

Copia de un objeto array
¿Recuerdas cuando hablamos acerca de Object.assign() anteriormente?

Es posible hacer lo mismo con la sintaxis de spread

let arr = [1, 2, 3];

let arrCopy = [...arr]; // separa el array en una lista de parameters
                        // luego pone el resultado en un nuevo array

// ¿los arrays tienen el mismo contenido?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// ¿los arrays son iguales?
alert(arr === arrCopy); // false (no es la misma referencia)

// modificando nuestro array inicial no modifica la copia:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
Nota que es posible hacer lo mismo para hacer una copia de un objeto:

let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // separa el objeto en una lista de parámetros
                          // luego devuelve el resultado en un nuevo objeto

// ¿tienen los objetos el mismo contenido?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// ¿son iguales los objetos?
alert(obj === objCopy); // false (no es la misma referencia)

// modificando el objeto inicial no modifica la copia:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

*/

/*
Cuando veamos "..." en el código, son los parámetros rest o el operador spread.

Hay una manera fácil de distinguir entre ellos:

Cuando ... se encuentra al final de los parámetros de una función, son los “parámetros rest” y recogen el resto de la lista de argumentos en un array.
Cuando ... está en el llamado de una función o similar, se llama “operador spread” y expande un array en una lista.
Patrones de uso:

Los parámetros rest son usados para crear funciones que acepten cualquier número de argumentos.
El operador spread es usado para pasar un array a funciones que normalmente requieren una lista de muchos argumentos.
Ambos ayudan a ir entre una lista y un array de parámetros con facilidad.

Todos los argumentos de un llamado a una función están también disponibles en el “viejo” arguments: un objeto símil-array iterable.

*/