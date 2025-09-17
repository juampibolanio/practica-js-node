/*
Para agregar/remover elementos:

push(...items) – agrega ítems al final,
pop() – extrae un ítem del final,
shift() – extrae un ítem del inicio,
unshift(...items) – agrega ítems al inicio.
splice(pos, deleteCount, ...items) – desde el índice pos borra deleteCount elementos e inserta items.
slice(start, end) – crea un nuevo array y copia elementos desde la posición start hasta end (no incluido) en el nuevo array.
concat(...items) – devuelve un nuevo array: copia todos los elementos del array actual y le agrega items. Si alguno de los items es un array, se toman sus elementos.
Para buscar entre elementos:

indexOf/lastIndexOf(item, pos) – busca por item comenzando desde la posición pos y devuelve su índice, o -1 si no lo encuentra.
includes(value) – devuelve true si el array contiene value, o false en caso contrario.
find/filter(func) – filtra elementos a través de ‘func’, devuelve el primero/todos los valores que devolvieron true.
findIndex es similar a find, pero devuelve el índice en lugar del valor.
Para iterar sobre elementos:

forEach(func) – llama la func para cada elemento, no devuelve nada.
Para transformar el array:

map(func) – crea un nuevo array a partir de los resultados de llamar a la func para cada elemento.
sort(func) – ordena el array y lo devuelve.
reverse() – ordena el array de forma inversa y lo devuelve.
split/join – convierte una cadena en un array y viceversa.
reduce/reduceRight(func, initial) – calcula un solo valor para todo el array, llamando a la func para cada elemento, obteniendo un resultado parcial en cada llamada y pasándolo a la siguiente.
Adicional:

Array.isArray(value) comprueba si value es un array.
Por favor tener en cuenta que sort, reverse y splice modifican el propio array.

Estos métodos son los más utilizados y cubren el 99% de los casos. Pero existen algunos más:

arr.some(fn)/arr.every(fn) comprueba el array.

La función fn es llamada para cada elemento del array de manera similar a map. Si alguno/todos los resultados son true, devuelve true, si no, false.

Estos métodos se comportan con similitud a los operadores || y &&: si fn devuelve un valor verdadero, arr.some() devuelve true y detiene la iteración de inmediato; si fn devuelve un valor falso, arr.every() devuelve false y detiene la iteración también.

Podemos usar every para comparar arrays:

function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
arr.fill(value, start, end) – llena el array repitiendo value desde el índice start hasta end.

arr.copyWithin(target, start, end) – copia sus elementos desde la posición start hasta la posición end en si mismo, a la posición target (reescribe lo existente).

arr.flat(depth)/arr.flatMap(fn) crea un nuevo array plano desde un array multidimensional .

Para la lista completa, ver manual.

A primera vista puede parecer que hay demasiados métodos y difíciles de recordar. En realidad es mucho más fácil de lo que se ve.

Revisa el ayudamemoria para conocerlos. Después realiza las prácticas de este capítulo para ganar experiencia con los métodos para arrays.

Finalmente si en algún momento necesitas hacer algo con un array y no sabes cómo, vuelve a esta página, mira el ayudamemoria y encuentra el método correcto. Los ejemplos te ayudarán a escribirlos correctamente y pronto los recordarás automáticamente y sin esfuerzo.
*/