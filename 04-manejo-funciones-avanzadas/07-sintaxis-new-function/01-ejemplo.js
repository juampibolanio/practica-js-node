/*
La sintaxis:

let func = new Function ([arg1, arg2, ...argN], functionBody);
Por razones históricas, los argumentos también pueden ser pasados como una lista separada por comas.

Estas tres declaraciones significan lo mismo:

new Function('a', 'b', 'return a + b'); // sintaxis básica
new Function('a,b', 'return a + b'); // separación por comas
new Function('a , b', 'return a + b'); // separación por comas con espacios
Las funciones creadas con new Function, tienen [[Environment]] haciendo referencia a ambiente léxico global, no al externo. En consecuencia no pueden usar variables externas. Pero eso es en realidad algo bueno, porque nos previene de errores. Pasar parámetros explícitamente es mucho mejor arquitectónicamente y no causa problemas con los minificadores.
*/