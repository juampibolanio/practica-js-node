/*
Considera el siguiente código:

let str = "Hello";

str.test = 5;

alert(str.test);
Qué piensas: ¿funcionará? ¿Qué mostrará?
*/

let str = "hello";

str.test = 5;

console.log(str.test);

/*
undefined (sin strict mode)
Un error. (strict mode)
¿Por qué? 

Cuando se accede a una propiedad de str, se crea un “wrapper object” (objeto envolvente ).
Con modo estricto, tratar de alterarlo produce error.
Sin modo estricto, la operación es llevada a cabo y el objeto obtiene la propiedad test, pero después de ello el “objeto envolvente” desaparece, entonces en la última linea str queda sin rastros de la propiedad.
Este ejemplo claramente muestra que los tipos primitivos no son objetos.

Ellos no pueden almacenar datos adicionales.
*/