/*
Los objetos son asignados y copiados por referencia. En otras palabras, una variable almacena no el valor del objeto sino una referencia (la dirección en la memoria) del valor. Entonces, copiar tal variable o pasarla como argumento de función copia la referencia, no el objeto.

Todas la operaciones a través de referencias copiadas (como agregar y borrar propiedades) son efectuadas en el mismo y único objeto .

Para hacer una “verdadera copia” (un clon), podemos usar Object.assign para la denominada “clonación superficial” (los objetos anidados son copiados por referencia), o la función de “clonación profunda” structuredClone o usar una implementación personalizada como _.cloneDeep(obj).
*/