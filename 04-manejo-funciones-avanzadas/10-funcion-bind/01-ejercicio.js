/*
¿Cuál será el resultado?

function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
*/