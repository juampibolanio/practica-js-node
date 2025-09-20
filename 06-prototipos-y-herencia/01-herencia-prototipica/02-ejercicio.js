/*
Tenemos rabbit heredando de animal.

Si llamamos a rabbit.eat(), ¿qué objeto recibe la propiedad full: animal o rabbit?

let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat(); RABBIT
*/