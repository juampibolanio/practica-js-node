/*
La sintaxis del constructor para un objeto promesa es:

let promise = new Promise(function(resolve, reject) {
  // Ejecutor (el código productor, "cantante")
});
La función pasada a new Promise se llama ejecutor. Cuando se crea new Promise, el ejecutor corre automáticamente. Este contiene el código productor que a la larga debería producir el resultado. En términos de la analogía anterior: el ejecutor es el “cantante”.

Sus argumentos resolve y reject son callbacks proporcionadas por el propio JavaScript. Nuestro código solo está dentro del ejecutor.

Cuando el ejecutor obtiene el resultado (más tarde o más temprano, eso no importa), debe llamar a una de estas dos callbacks:

resolve(value) – resuelto: si el trabajo finalizó con éxito, con el resultado value.
reject(error) – rechazado: si ocurrió un error, con un objeto error.
Para resumir: el ejecutor corre automáticamente e intenta realizar una tarea. Cuando termina con el intento, llama a resolve si fue exitoso o reject si hubo un error.

El objeto promise devuelto por el constructor new Promise tiene estas propiedades internas:

state – inicialmente "pendiente"; luego cambia a "cumplido" cuando se llama a resolve, o a "rechazado" cuando se llama a reject.
result – inicialmente undefined; luego cambia a valor cuando se llama a resolve(valor), o a error cuando se llama a reject(error).

Un objeto Promise sirve como enlace entre el ejecutor (el “código productor” o el “cantante”) y las funciones consumidoras (los “fanáticos”), que recibirán un resultado o un error. Las funciones de consumo pueden registrarse (suscribirse) utilizando los métodos .then y .catch.

promise.then(
  function(result),
  function(error) 
);

El primer argumento de .then es una función que se ejecuta cuando se resuelve la promesa y recibe el resultado.
El segundo argumento de .then es una función que se ejecuta cuando se rechaza la promesa y recibe el error.



catch
Si solo nos interesan los errores, entonces podemos usar null como primer argumento: .then(null, errorHandlingFunction). O podemos usar .catch(errorHandlingFunction), que es exactamente lo mismo:

let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Vaya!")), 1000);
});

// .catch(f) es lo mismo que promise.then(null, f)
promise.catch(alert); // muestra "Error: ¡Vaya!" después de 1 segundo





Limpieza: finally
Al igual que en un try {...} catch {...}, las promesas también tienen la cláusula finally.

La llamada .finally(f) es similar a .then(f, f), ya que garantiza que f se ejecute siempre, sin importar si la promesa se resuelve o rechaza.

La idea de finally es definir un manejador para realizar tareas de limpieza y finalización una vez que la operacióm haya concluido.

new Promise((resolve, reject) => 
  /* hacer algo para tomar tiempo y luego llamar a resolve o reject 
})
  // se ejecuta cuando la promesa quedó establecida, no importa si con éxito o no
  .finally(() => stop loading indicator)
  // así el indicador de carga siempre es detenido antes de que sigamos adelante
  .then(result => show result, err => show error)
*/