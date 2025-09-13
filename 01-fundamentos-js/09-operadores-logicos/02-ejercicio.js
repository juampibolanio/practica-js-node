/*

¿Cuál será la salida del siguiente código?

alert( alert(1) || 2 || alert(3) );
*/

alert( alert(1) || 2 || alert(3) ); // esto devuelve un valor truthy, que es 1 y luego 2, 

/*
Una llamada a alert no retorna un valor relevante. Siempre retorna undefined.

El primer OR || comienza evaluando el operando de la izquierda alert(1). Este alert muestra el primer mensaje con 1.
Ese mismo alert retorna undefined, por lo que OR se dirige al segundo operando buscando un valor truthy.
El segundo operando 2 es un valor truthy, por lo que el OR detiene su ejecución y retorna el 2. Este 2 es luego mostrado por el alert exterior.
No habrá 3 debido a que la evaluación nunca alcanza a alert(3). 
*/