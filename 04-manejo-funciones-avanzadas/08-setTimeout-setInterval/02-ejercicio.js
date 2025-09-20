/*
En el siguiente código hay una llamada programada setTimeout, luego se ejecuta un cálculo pesado que demora más de 100 ms en finalizar.

¿Cuándo se ejecutará la función programada?

Después del bucle.
Antes del bucle.
Al comienzo del bucle.
¿Qué va a mostrar ´alert()´?

let i = 0;

setTimeout(() => alert(i), 100); // ?

// asumimos que el tiempo para ejecutar esta función es > 100 ms
for(let j = 0; j < 100000000; j++) {
  i++;
}

 */