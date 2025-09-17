/*
Iterables
Los objetos iterables son una generalización de arrays. Es un concepto que permite que cualquier objeto pueda ser utilizado en un bucle for..of.

Por supuesto, las matrices o arrays son iterables. Pero hay muchos otros objetos integrados que también lo son. Por ejemplo, las cadenas o strings son iterables también. Como veremos, muchos operadores y métodos se basan en la iterabilidad.

Si un objeto no es técnicamente una matriz, pero representa una colección (lista, conjunto) de algo, entonces el uso de la sintaxis for..of es una gran forma de recorrerlo. 


Los objetos que se pueden usar en for..of se denominan iterables.

Técnicamente, los iterables deben implementar el método llamado Symbol.iterator.
El resultado de obj[Symbol.iterator]() se llama iterador. Maneja el proceso de iteración adicional.
Un iterador debe tener el método llamado next() que devuelve un objeto {done: Boolean, value: any}, donde done: true marca el fin de la iteración; de lo contrario, value es el siguiente valor.
El método Symbol.iterator se llama automáticamente por for..of, pero también podemos llamarlo directamente.
Los iterables integrados, como cadenas o matrices, también implementan Symbol.iterator.
El iterador de cadena es capaz de manejar los pares sustitutos.
Los objetos que tienen propiedades indexadas y longitud o length se llaman array-like. Dichos objetos también pueden tener otras propiedades y métodos, pero carecen de los métodos integrados de las matrices.

Si miramos dentro de la especificación, veremos que la mayoría de los métodos incorporados suponen que funcionan con iterables o array-likes en lugar de matrices “reales”, porque eso es más abstracto.

Array.from (obj[, mapFn, thisArg]) crea un verdadero Array de un obj iterable o array-like, y luego podemos usar métodos de matriz en él. Los argumentos opcionales mapFn y thisArg nos permiten aplicar una función a cada elemento.
*/

