/*
Hay 8 tipos básicos en JavaScript.

Siete tipos de datos primitivos
number para números de cualquier tipo: enteros o de punto flotante, los enteros están limitados por ±(253-1).
bigint para números enteros de longitud arbitraria.
string para cadenas. Una cadena puede tener cero o más caracteres, no hay un tipo especial para un único carácter.
boolean para verdadero y falso: true/false.
null para valores desconocidos – un tipo independiente que tiene un solo valor nulo: null.
undefined para valores no asignados – un tipo independiente que tiene un único valor “indefinido”: undefined.
symbol para identificadores únicos.
Y un tipo de dato no primitivo:
object para estructuras de datos complejas.
El operador typeof nos permite ver qué tipo está almacenado en una variable.

Dos formas: typeof x o typeof(x).
Devuelve una cadena con el nombre del tipo. Por ejemplo "string".
Para null devuelve "object": esto es un error en el lenguaje, en realidad no es un objeto.

¿Cuál es la salida del script?

let name = "Ilya";

alert( `Hola ${1}` ); // devuelve Hola 1

alert( `Hola ${"name"}` ); // devuelve Hola name

alert( `Hola ${name}` ); // devuelve Hola Ilya
 */

let name = "Ilya";

alert( `Hola ${1}` ); 

alert( `Hola ${"name"}` ); 

alert( `Hola ${name}` ); 