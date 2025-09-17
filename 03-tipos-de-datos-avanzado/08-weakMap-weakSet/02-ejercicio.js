/*
Hay un array semejante al de la actividad anterior. La situación es similar:

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
La pregunta ahora es: ¿qué estructura de datos es la adecuada para almacenar la información: “¿cuándo se leyó el mensaje?”.

En la tarea anterior solo necesitábamos almacenar el hecho de “sí/no”. Ahora necesitamos almacenar la fecha, y solo debe permanecer en la memoria hasta que el mensaje sea recolectado como basura.

P.D Las fechas se pueden almacenar como objetos de la clase incorporada Date, que cubriremos más adelante.
*/

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// // Objeto Date que estudiaremos más tarde