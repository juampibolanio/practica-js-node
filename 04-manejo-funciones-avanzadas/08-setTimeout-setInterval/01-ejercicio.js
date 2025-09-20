/*
Escriba una función printNumbers(from, to) que genere un número cada segundo, comenzando desde from y terminando con to.


Usando setInterval.
*/


function printNumbers(from, to) {

    let current = from;

    let timerId = setInterval(function() {
        console.log(current);

        if (current == to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}

printNumbers(1, 10);