/*
Hay un valor en la propiedad de una función. ¿Cambiará después de bind? ¿Por qué sí o por qué no?

function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // ¿Cuál será la salida? ¿por qué?

RE: undefined
*/