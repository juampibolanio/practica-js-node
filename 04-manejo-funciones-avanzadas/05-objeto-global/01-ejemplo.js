/*
El objeto global proporciona variables y funciones que están disponibles en cualquier lugar. Por defecto, aquellas que están integradas en el lenguaje o el entorno.

En un navegador se denomina window, para Node.js esglobal, para otros entornos puede tener otro nombre.

Recientemente, se agregó globalThis al lenguaje, como un nombre estandarizado para un objeto global, que debería ser compatible con todos los entornos al igual que con los principales navegadores.

El objeto global contiene variables que deberían estar disponibles en todas partes.

Eso incluye JavaScript incorporado, tales como Array y valores específicos del entorno, o como window.innerHeight: la altura de la ventana en el navegador.

El objeto global tiene un nombre universal: globalThis.

… Pero con mayor frecuencia se hace referencia a nombres específicos del entorno de la “vieja escuela”, como window (en el navegador) y global (en Node.js).

Deberíamos almacenar valores en el objeto global solo si son verdaderamente globales para nuestro proyecto. Y manteniendo su uso al mínimo.

En el navegador, a menos que estemos utilizando módulos, las funciones globales y las variables declaradas con var se convierten en propiedades del objeto global.

Para que nuestro código esté preparado para el futuro y sea más fácil de entender, debemos acceder a las propiedades del objeto global directamente, como window.x.
*/