/*
¿Cuál es el resultado y por qué?

let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
*/

let arr = ["a", "b"];

arr.push(function() {
  console.log( this );
});

arr[2](); // 