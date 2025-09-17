/*
¿Qué sucede cuando los objetos se suman obj1 + obj2, se restan obj1 - obj2 o se imprimen utilizando alert(obj)?

En ese caso, los objetos se convierten automáticamente en valores primitivos, y luego se lleva a cabo la operación sobre esos primitivos, y resultan en un valor primitivo.
Esto es una limitación importante: el resultado de obj1 + obj2 (u otra operación) ¡no puede ser otro objeto!

Por ejemplo no podemos hacer objetos que representen vectores o matrices (o conquistas o lo que sea), sumarlas y esperar un objeto “sumado” como resultado. Tal objetivo arquitectural cae automáticamente “fuera del tablero”.

Como técnicamente no podemos hacer mucho aquí, no se hacen matemáticas con objetos en proyectos reales. Cuando ocurre, con alguna rara excepción es por un error de código.

En este capítulo cubriremos cómo un objeto se convierte a primitivo y cómo podemos personalizarlo.

Tenemos dos propósitos:

Nos permitirá entender qué ocurre en caso de errores de código, cuando tal operación ocurre accidentalmente.
Hay excepciones, donde tales operaciones son posibles y se ven bien. Por ejemplo al restar o comparar fechas (objetos Date). Las discutiremos más adelante.

Los métodos toString y valueOf provienen de tiempos remotos. No son símbolos (los símbolos no existían en aquel tiempo) sino métodos “normales” nombrados con strings. Proporcionan una forma alternativa “al viejo estilo” de implementar la conversión.

Estos métodos deben devolver un valor primitivo. Si toString o valueOf devuelve un objeto, entonces se ignora (lo mismo que si no hubiera un método).

De forma predeterminada, un objeto simple tiene los siguientes métodos toString y valueOf:

El método toString devuelve un string "[object Object]".
El método valueOf devuelve el objeto en sí.
Aquí está la demostración:

let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
Por lo tanto, si intentamos utilizar un objeto como un string, como en un alert o algo así, entonces por defecto vemos [object Object].

El valueOf predeterminado se menciona aquí solo en favor de la integridad, para evitar confusiones. Como puede ver, devuelve el objeto en sí, por lo que se ignora. No me pregunte por qué, es por razones históricas. Entonces podemos asumir que no existe.


Resumen
La conversión de objeto a valor primitivo es llamada automáticamente por muchas funciones y operadores incorporados que esperan un valor primitivo.

Hay 3 tipos (hints o sugerencias) de estas:

"string" (para alert y otras operaciones que necesitan un string)
"number" (para matemáticas)
"default" (pocos operadores, usualmente los objetos lo implementan del mismo modo que "number")
La especificación describe explícitamente qué operador utiliza qué sugerencia.

El algoritmo de conversión es:

Llamar a obj[Symbol.toPrimitive](hint) si el método existe,
En caso contrario, si la sugerencia es "string"
intentar llamar a obj.toString() y obj.valueOf(), lo que exista.
En caso contrario, si la sugerencia es "number" o "default"
intentar llamar a obj.valueOf() y obj.toString(), lo que exista.
Todos estos métodos deben devolver un primitivo para funcionar (si está definido).

En la práctica, a menudo es suficiente implementar solo obj.toString() como un método “atrapatodo” para todas las conversiones a string que deben devolver la representación “legible por humanos” de un objeto, con fines de registro o depuración.

Como en las operaciones matemáticas, JavaScript no ofrece una forma de “sobrescribir” operadores usando métodos. Así que en proyectos de la vida real raramente se los usa en objetos.
*/