/*
Convierte el user a JSON y luego léalo de vuelta en otra variable.

let user = {
  name: "John Smith",
  age: 35
};
*/

let user = {
  name: "John Smith",
  age: 35
};

let userJson = JSON.stringify(user);

console.log(userJson);