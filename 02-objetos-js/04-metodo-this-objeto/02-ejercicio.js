/*
Crea un objeto calculator con tres métodos:

read() pide dos valores y los almacena como propiedades de objeto con nombres a y b.
sum() devuelve la suma de los valores almacenados.
mul() multiplica los valores almacenados y devuelve el resultado.
let calculator = {
  // ... tu código ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
*/

let calculator = {
    a : 0,
    b : 0,

    read(n1, n2) {
        this.a = n1; // la version web seria +prompt('a?', 0);
        this.b = n2; //  +prompt('b?', 0);
    },

    sum() {
        return this.a + this.b;
    },

    mul() {
        return this.a * this.b
    }
}

calculator.read(5, 5);

console.log(calculator.sum());
console.log(calculator.mul());