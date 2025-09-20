/*
Aquí hacemos dos contadores: counter y counter2 usando la misma función makeCounter.

¿Son independientes? ¿Qué va a mostrar el segundo contador? 0,1 o 2,3 o algo más?

function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

alert( counter2() ); // 0
alert( counter2() ); // 1

Son independientes porque son referencias distintas, es decir, por diferentes invocaciones de makeCounter
*/