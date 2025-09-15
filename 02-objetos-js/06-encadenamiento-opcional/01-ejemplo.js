/*
Encadenamiento opcional '?.'

El encadenamiento opcional ?. es una forma a prueba de errores para acceder a las propiedades anidadas de los objetos, incluso si no existe una propiedad intermedia.


Encadenamiento opcional
El encadenamiento opcional ?. detiene la evaluación y devuelve undefined si el valor antes del ?. es undefined o null.

De aquí en adelante en este artículo, por brevedad, diremos que algo “existe” si no es null o undefined.

En otras palabras, value?.prop:

funciona como value.prop si value existe,
de otro modo (cuando value es undefined/null) devuelve undefined.
Aquí está la forma segura de acceder a user.address.street usando ?.:

let user = {}; // El usuario no tiene dirección

alert( user?.address?.street ); // undefined (no hay error)

Short-circuiting (Cortocircuitos)
Como se dijo antes, el ?. detiene inmediatamente (“cortocircuito”) la evaluación si la parte izquierda no existe.

Entonces, si a la derecha de ?. hay funciones u operaciones adicionales, estas no se ejecutarán:

Por ejemplo:

let user = null;
let x = 0;

user?.sayHi(x++); // no hay "user", por lo que la ejecución no alcanza a sayHi ni a x++

alert(x); // 0, el valor no se incrementa
Otros casos: ?.(), ?.[]
El encadenamiento opcional ?. no es un operador, es una construcción de sintaxis especial que también funciona con funciones y corchetes.

Por ejemplo, ?.() se usa para llamar a una función que puede no existir.

En el siguiente código, algunos de nuestros usuarios tienen el método admin, y otros no:

let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // no pasa nada (no existe tal método)
Aquí, en ambas líneas, primero usamos el punto (userAdmin.admin) para obtener la propiedad admin, porque asumimos que el objeto user existe y es seguro leerlo.

Entonces ?.() comprueba la parte izquierda: si la función admin existe, entonces se ejecuta (para userAdmin). De lo contrario (para userGuest) la evaluación se detiene sin errores.

La sintaxis ?.[] también funciona si quisiéramos usar corchetes [] para acceder a las propiedades en lugar de punto .. Al igual que en casos anteriores, permite leer de forma segura una propiedad de un objeto que puede no existir.

let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
También podemos usar ?. con delete:

delete user?.name; // Eliminar user.name si el usuario existe
Podemos usar ?. para una lectura y eliminación segura, pero no para escribir
El encadenamiento opcional ?. no puede usarse en el lado izquierdo de una asignación:

Por ejemplo:

let user = null;

user?.name = "John"; // Error, no funciona
// porque se evalúa como: undefined = "John"







Resumen
La sintaxis de encadenamiento opcional ?. tiene tres formas:

obj?.prop – devuelve obj.prop si obj existe, si no, undefined.
obj?.[prop] – devuelve obj[prop] si obj existe, si no, undefined.
obj.method?.() – llama a obj.method() si obj.method existe, si no devuelve undefined.
Como podemos ver, todos ellos son sencillos y fáciles de usar. El ?. comprueba si la parte izquierda es null/undefined y permite que la evaluación continúe si no es así.

Una cadena de ?. permite acceder de forma segura a las propiedades anidadas.

Aún así, debemos aplicar ?. con cuidado, solamente donde sea aceptable que, de acuerdo con nuestra lógica, la parte izquierda no exista. Esto es para que no nos oculte errores de programación, si ocurren.
*/