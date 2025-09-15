/*
Crear una función constructora Calculator que crea objetos con 3 métodos:

read() pide dos valores usando prompt y los guarda en las propiedades del objeto con los nombres a y b.
sum() devuelve la suma de estas propiedades.
mul() devuelve el producto de la multiplicación de estas propiedades.
Por ejemplo:

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
*/

function Calculator() {
    this.a = 0,
    this.b = 0,

    this.read = function() {
        this.a = +prompt("Ingrese un valor: ", "0");
        this.b = +prompt("Ingrese otro valor: ", "0");
    }

    this.sum = function() {
        return this.a + this.b;
    }

    this.mul = function() {
        return this.a * this.b;
    }
}

let calculator = new Calculator();

calculator.read();

alert( "Suma = " + calculator.sum() );
alert( "Multiplicacion = " + calculator.mul() );