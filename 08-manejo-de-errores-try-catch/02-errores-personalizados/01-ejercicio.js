/*
Cree una clase FormatError que herede de la clase incorporada SyntaxError.

Debería admitir las propiedades message, name y stack.

Ejemplo de uso:

let err = new FormatError("error de formato");

alert( err.message ); // error de formato
alert( err.name ); // FormatError
alert( err.stack ); // pila

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (porque hereda de SyntaxError)
*/

class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}