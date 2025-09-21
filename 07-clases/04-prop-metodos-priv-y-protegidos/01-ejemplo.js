/*
En la programación orientada a objetos, las propiedades y los métodos se dividen en dos grupos:

Interfaz interna – métodos y propiedades, accesibles desde otros métodos de la clase, pero no desde el exterior.
Interfaz externa – métodos y propiedades, accesibles también desde fuera de la clase.
O...
Público: accesible desde cualquier lugar. Comprenden la interfaz externa. Hasta ahora solo estábamos usando propiedades y métodos públicos.
Privado: accesible solo desde dentro de la clase. Estos son para la interfaz interna.

En muchos otros lenguajes también existen campos “protegidos”: accesibles solo desde dentro de la clase y aquellos que lo extienden (como privado, pero más acceso desde clases heredadas). También son útiles para la interfaz interna. En cierto sentido, están más extendidos que los privados, porque generalmente queremos que las clases heredadas tengan acceso a ellas.

Las propiedades protegidas generalmente tienen el prefijo de subrayado _.

Aquí usamos la sintaxis getter/setter.

Pero la mayoría de las veces las funciones get.../set... son preferidas, como esta:

class CoffeeMachine {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);




Los privados deberían comenzar con #. Solo son accesibles desde dentro de la clase.

class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

// no puede acceder a privados desde fuera de la clase
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error

A nivel de lenguaje, # es una señal especial de que el campo es privado. No podemos acceder desde fuera o desde clases heredadas.

Los campos privados no entran en conflicto con los públicos. Podemos tener campos privados #waterAmount y públicos waterAmount al mismo tiempo.


En términos de POO, la delimitación de la interfaz interna de la externa se llama encapsulamiento.

Ofrece los siguientes beneficios:

Protección para los usuarios, para que no se disparen en el pie
Imagínese, hay un equipo de desarrolladores que usan una máquina de café. Fue hecho por la compañía “Best CoffeeMachine” y funciona bien, pero se quitó una cubierta protectora. Entonces la interfaz interna está expuesta.

Todos los desarrolladores son civilizados: usan la máquina de café según lo previsto. Pero uno de ellos, John, decidió que él era el más inteligente e hizo algunos ajustes en el interior de la máquina de café. Entonces la máquina de café falló dos días después.

Seguramente no es culpa de John, sino de la persona que quitó la cubierta protectora y dejó que John hiciera sus manipulaciones.

Lo mismo en programación. Si un usuario de una clase cambiará cosas que no están destinadas a ser cambiadas desde el exterior, las consecuencias son impredecibles.

Soportable
La situación en la programación es más compleja que con una máquina de café de la vida real, porque no solo la compramos una vez. El código se somete constantemente a desarrollo y mejora.

Si delimitamos estrictamente la interfaz interna, el desarrollador de la clase puede cambiar libremente sus propiedades y métodos internos, incluso sin informar a los usuarios.

Si usted es un desarrollador de tal clase, es bueno saber que los métodos privados se pueden renombrar de forma segura, sus parámetros se pueden cambiar e incluso eliminar, porque ningún código externo depende de ellos.

Para los usuarios, cuando sale una nueva versión, puede ser una revisión total internamente, pero aún así es simple de actualizar si la interfaz externa es la misma.

Ocultando complejidad
La gente adora usar cosas que son simples. Al menos desde afuera. Lo que hay dentro es algo diferente.

Los programadores no son una excepción.

Siempre es conveniente cuando los detalles de implementación están ocultos, y hay disponible una interfaz externa simple y bien documentada.

Para ocultar una interfaz interna utilizamos propiedades protegidas o privadas:

Los campos protegidos comienzan con _. Esa es una convención bien conocida, no aplicada a nivel de lenguaje. Los programadores solo deben acceder a un campo que comience con _ de su clase y las clases que hereden de él.
Los campos privados comienzan con #. JavaScript se asegura de que solo podamos acceder a los que están dentro de la clase.
En este momento, los campos privados no son compatibles entre los navegadores, pero se puede usar “polyfill”.
*/