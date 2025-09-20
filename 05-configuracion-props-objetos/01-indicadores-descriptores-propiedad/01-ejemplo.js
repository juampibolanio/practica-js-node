/*

Indicadores de propiedad
Las propiedades de objeto, aparte de un value, tienen tres atributos especiales (también llamados “indicadores”):

writable – si es true, puede ser editado, de otra manera es de solo lectura.
enumerable – si es true, puede ser listado en bucles, de otro modo no puede serlo.
configurable – si es true, la propiedad puede ser borrada y estos atributos pueden ser modificados, de otra forma no.
No los vimos hasta ahora porque generalmente no se muestran. Cuando creamos una propiedad “de la forma usual”, todos ellos son true. Pero podemos cambiarlos en cualquier momento.

Primero, veamos como obtener estos indicadores.

El método Object.getOwnPropertyDescriptor permite consultar toda la información sobre una propiedad.

La sintaxis es:

let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
obj
El objeto del que se quiere obtener la información.
propertyName
El nombre de la propiedad.
El valor devuelto es el objeto llamado “descriptor de propiedad”: este contiene el valor de todos los indicadores.

Por ejemplo:

let user = {
  name: "Juan"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* descriptor de propiedad:
{
  "value": "Juan",
  "writable": true,
  "enumerable": true,
  "configurable": true
}

Para modificar los indicadores podemos usar Object.defineProperty.

La sintaxis es:

Object.defineProperty(obj, propertyName, descriptor)
obj, propertyName
el objeto y la propiedad con los que se va a trabajar.
descriptor
descriptor de propiedad a aplicar.
Si la propiedad existe, defineProperty actualiza sus indicadores. De otra forma, creará la propiedad con el valor y el indicador dado; en ese caso, si el indicador no es proporcionado, es asumido como false.

En el ejemplo a continuación, se crea una propiedad name con todos los indicadores en false:

let user = {};

Object.defineProperty(user, "name", {
  value: "Juan"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "Juan",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 
Comparado con la creada “de la forma usual” user.name: ahora todos los indicadores son false. Si no es lo que queremos, es mejor que los establezcamos en true en el descriptor.

Ahora veamos los efectos de los indicadores con ejemplo.

Non-writable
Vamos a hacer user.name de solo lectura cambiando el indicador writable:

let user = {
  name: "Juan"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "Pedro"; // Error: No se puede asignar a la propiedad de solo lectura 'name'...
Ahora nadie puede cambiar el nombre de nuestro usuario, a menos que le apliquen su propio defineProperty para sobrescribir el nuestro.

Los errores aparecen solo en modo estricto
En el modo no estricto, no se producen errores al intentar escribir en propiedades no grabables; pero la operación no tendrá éxito. Las acciones que infringen el indicador se ignoran silenciosamente en el modo no estricto.

Aquí está el mismo ejemplo, pero la propiedad se crea desde cero:

let user = { };

Object.defineProperty(user, "name", {

  value: "Pedro",
  // para las nuevas propiedades se necesita listarlas explícitamente como true
  enumerable: true,
  configurable: true
});

alert(user.name); // Pedro
user.name = "Alicia"; // Error
Non-enumerable
Ahora vamos a añadir un toString personalizado a user.

Normalmente, en los objetos un toString nativo es no enumerable, no se muestra en un bucle for..in. Pero si añadimos nuestro propio toString, por defecto éste se muestra en los bucles for..in:

let user = {
  name: "Juan",
  toString() {
    return this.name;
  }
};

// Por defecto, nuestras propiedades se listan:
for (let key in user) alert(key); // name, toString
Si no es lo que queremos, podemos establecer enumerable:false. Entonces no aparecerá en bucles for..in, exactamente como el toString nativo:

let user = {
  name: "Juan",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
  enumerable: false
});

// Ahora nuestro toString desaparece:
for (let key in user) alert(key); // nombre
Las propiedades no enumerables también se excluyen de Object.keys:

alert(Object.keys(user)); // name
Non-configurable
El indicador “no-configurable” (configurable:false) a veces está preestablecido para los objetos y propiedades nativos.

Una propiedad no configurable no puede ser eliminada, y sus atributos no pueden ser modificados.

Por ejemplo, Math.PI es de solo lectura, no enumerable y no configurable:

let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}

Así, un programador es incapaz de cambiar el valor de Math.PI o sobrescribirlo.

Math.PI = 3; // Error, porque tiene writable: false

// delete Math.PI tampoco funcionará
Tampoco podemos cambiar Math.PI a writable de vuelta:

// Error, porque configurable: false
Object.defineProperty(Math, "PI", { writable: true });
No hay nada en absoluto que podamos hacer con Math.PI.

Convertir una propiedad en no configurable es una calle de un solo sentido. No podremos cambiarla de vuelta con defineProperty.

Observa que “configurable: false” impide cambios en los indicadores de la propiedad y su eliminación, pero permite el cambio de su valor.

Aquí user.name es “non-configurable”, pero aún puede cambiarse (por ser “writable”):

let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // funciona
delete user.name; // Error
Y aquí hacemos user.name una constante “sellada para siempre”, tal como la constante nativa Math.PI:

let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// No seremos capaces de cambiar user.name o sus identificadores
// Nada de esto funcionará:
user.name = "Pedro";
delete user.name;
Object.defineProperty(user, "name", { value: "Pedro" });
Único cambio de atributo posible: writable true → false
Hay una excepción menor acerca del cambio de indicadores.

Podemos cambiar writable: true a false en una propiedad no configurable, impidiendo en más la modificación de su valor (sumando una capa de protección). Aunque no hay vuelta atrás.

Object.defineProperties
Existe un método Object.defineProperties(obj, descriptors) que permite definir varias propiedades de una sola vez.

La sintaxis es:

Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
Por ejemplo:

Object.defineProperties(user, {
  name: { value: "Juan", writable: false },
  surname: { value: "Perez", writable: false },
  // ...
});
Entonces podemos asignar varias propiedades al mismo tiempo.

Object.getOwnPropertyDescriptors
Para obtener todos los descriptores al mismo tiempo, podemos usar el método Object.getOwnPropertyDescriptors(obj).

Junto con Object.defineProperties, puede ser usado como una forma “consciente de los indicadores” de clonar un objeto:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
Normalmente, cuando clonamos un objeto, usamos una asignación para copiar las propiedades:

for (let key in user) {
  clone[key] = user[key]
}
… pero esto no copia los indicadores. Así que si queremos un “mejor” clon entonces se prefiere Object.defineProperties.

Otra diferencia es que for..in ignora las propiedades simbólicas y las no enumerables, pero Object.getOwnPropertyDescriptors devuelve todos los descriptores de propiedades incluyendo simbólicas y no enumerables.

Sellando un objeto globalmente
Los descriptores de propiedad trabajan al nivel de propiedades individuales.

También hay métodos que limitan el acceso al objeto completo:

Object.preventExtensions(obj)
Prohíbe añadir propiedades al objeto.
Object.seal(obj)
Prohíbe añadir/eliminar propiedades, establece todas las propiedades existentes como configurable: false.
Object.freeze(obj)
Prohíbe añadir/eliminar/cambiar propiedades, establece todas las propiedades existentes como configurable: false, writable: false.
También tenemos formas de probarlos:

Object.isExtensible(obj)
Devuelve false si esta prohibido añadir propiedades, si no true.
Object.isSealed(obj)
Devuelve true si añadir/eliminar propiedades está prohibido, y todas las propiedades existentes tienen configurable: false.
Object.isFrozen(obj)
Devuelve true si añadir/eliminar/cambiar propiedades está prohibido, y todas las propiedades son configurable: false, writable: false.
Estos métodos son usados rara vez en la práctica.

*/