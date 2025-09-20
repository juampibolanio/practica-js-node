/*
Para crear un objeto con un prototipo dado, use:
sintaxis literal: { __proto__: ... }, permite especificar multiples propiedades
o Object.create(proto, [descriptors]), permite especificar descriptores de propiedad.
El Object.create brinda una forma fácil de hacer la copia superficial de un objeto con todos sus descriptores:

let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
Los métodos modernos para obtener y establecer el prototipo son:

Object.getPrototypeOf(obj) – devuelve el [[Prototype]] de obj (igual que el getter de __proto__).
Object.setPrototypeOf(obj, proto) – establece el [[Prototype]] de obj en proto (igual que el setter de __proto__).
No está recomendado obtener y establecer el prototipo usando los getter/setter nativos de __proto__. Ahora están en el Anexo B de la especificación.

También hemos cubierto objetos sin prototipo, creados con Object.create(null) o {__proto__: null}.

Estos objetos son usados como diccionarios, para almacenar cualquier (posiblemente generadas por el usuario) clave.

Normalmente, los objetos heredan métodos nativos y getter/setter de __proto__ desde Object.prototype, haciendo sus claves correspondientes “ocupadas” y potencialmente causar efectos secundarios. Con el prototipo null, los objetos están verdaderamente vacíos.

*/

/*
Añadir toString al diccionario
Hay un objeto dictionary, creado como Object.create(null), para almacenar cualquier par clave/valor.

Agrega el método dictionary.toString(), que debería devolver una lista de claves delimitadas por comas. Tu toString no debe aparecer al iterar un for..in sobre el objeto.

resul: 

let dictionary = Object.create(null, {
  toString: { // define la propiedad toString
    value() { // el valor es una función
      return Object.keys(this).join();
    }
  }
});

// agregar algunos datos
dictionary.apple = "Manzana";
dictionary.__proto__ = "prueba"; // // aquí proto es una propiedad clave común

// solo manzana y __proto__ están en el ciclo
for(let key in dictionary) {
  alert(key); // "manzana", después "__proto__"
}

// tu toString en acción
alert(dictionary); // "manzana,__proto__"
*/