/*
La función incorporada setTimeout utiliza callbacks. Crea una alternativa basada en promesas.

La función delay(ms) debería devolver una promesa. Esa promesa debería resolverse después de ms milisegundos, para que podamos agregarle .then, así:

function delay(ms) {
  // tu código
}

delay(3000).then(() => alert('se ejecuta después de 3 segundos'));
*/

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

delay(3000).then(() => console.log('se ejecuta despues de 3s'))

/*
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
otra forma de resolver
*/