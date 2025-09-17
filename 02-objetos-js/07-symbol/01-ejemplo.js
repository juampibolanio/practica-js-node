/*
Según la especificación, solo dos de los tipos primitivos pueden servir como clave de propiedad de objetos:

string, o
symbol.
Si se usa otro tipo, como un número, este se autoconvertirá a string. Así, obj[1] es lo mismo que obj["1"], y obj[true] es lo mismo que obj["true"].


Symbols
El valor de “Symbol” representa un identificador único.

Un valor de este tipo puede ser creado usando Symbol():

let id = Symbol();
Al crearlo, podemos agregarle una descripción (también llamada symbol name), que será útil en la depuración de código:

// id es un symbol con la descripción "id"
let id = Symbol("id");
Se garantiza que los símbolos son únicos. Aunque declaremos varios Symbols con la misma descripción, éstos tendrán valores distintos. La descripción es solamente una etiqueta que no afecta nada más.

Por ejemplo, aquí hay dos Symbols con la misma descripción… pero no son iguales:

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

Para resumir: un symbol es un “valor primitivo único” con una descripción opcional.


La mayoría de los valores en JavaScript soportan la conversión implícita a string. Por ejemplo, podemos hacer un ´alert´ con casi cualquier valor y funcionará. Los Symbols son especiales, éstos no se autoconvierten.

Por ejemplo, este alert mostrará un error:

let id = Symbol("id");
alert(id); // TypeError: No puedes convertir un valor Symbol en string
Esta es una “protección del lenguaje” para evitar errores, ya que String y Symbol son fundamentalmente diferentes y no deben convertirse accidentalmente uno en otro.

Si realmente queremos mostrar un Symbol, necesitamos llamar el método .toString() explícitamente:

let id = Symbol("id");
alert(id.toString()); // Symbol(id), ahora sí funciona
U obtener symbol.description para mostrar solamente la descripción:

let id = Symbol("id");
alert(id.description); // id



Claves “Ocultas”
Los Symbols nos permiten crear propiedades “ocultas” en un objeto, a las cuales ninguna otra parte del código puede accesar ni sobrescribir accidentalmente.

Por ejemplo, si estamos trabajando con objetos user que pertenecen a código de terceros y queremos agregarles identificadores:

Utilicemos una clave symbol para ello:

let user = { // pertenece a otro código
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // podemos accesar a la información utilizando el symbol como nombre de clave



Symbol es un tipo de dato primitivo para identificadores únicos.

Symbols son creados al llamar Symbol() con una descripción opcional.

Symbols son siempre valores distintos aunque tengan el mismo nombre. Si queremos que symbols con el mismo nombre tengan el mismo valor, entonces debemos guardarlos en el registro global: Symbol.for(key) retornará un symbol (en caso de no existir, lo creará) con el key como su nombre. Todas las llamadas de Symbol.for con ese nombre retornarán siempre el mismo symbol.

Symbols se utilizan principalmente en dos casos:

Propiedades de objeto “Ocultas”

Si queremos agregar una propiedad a un objeto que “pertenece” a otro script u otra librería, podemos crear un symbol y usarlo como clave. Una clave symbol no aparecerá en los ciclos for..in, por lo que no podrá ser procesada accidentalmente junto con las demás propiedades. Tampoco puede ser accesada directamente, porque un script ajeno no tiene nuestro symbol. Por lo tanto la propiedad estará protegida contra uso y escritura accidentales.

Podemos “ocultar” ciertos valores dentro de un objeto que solo estarán disponibles dentro de ese script usando las claves de symbol.

Existen diversos symbols del sistema que utiliza Javascript, a los cuales podemos accesar por medio de Symbol.*. Podemos usarlos para alterar algunos comportamientos. Por ejemplo, más adelante en el tutorial, usaremos Symbol.iterator para iterables, Symbol.toPrimitive para configurar object-to-primitive conversion.

Técnicamente, los symbols no están 100% ocultos. Existe un método incorporado Object.getOwnPropertySymbols(obj) que nos permite obtener todos los symbols. También existe un método llamado Reflect.ownKeys(obj) que devuelve todas las claves de un objeto, incluyendo las que son de tipo symbol. Pero la mayoría de las librerías, los métodos incorporados y las construcciones de sintaxis no usan estos métodos.
*/