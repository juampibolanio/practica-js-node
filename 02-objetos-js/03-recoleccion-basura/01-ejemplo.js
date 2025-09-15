/*
Ese es el concepto de cómo funciona la recolección de basura. El motor de JavaScript aplica muchas optimizaciones para que se ejecute más rápido y no introduzca retrasos en la ejecución de código.

Algunas de las optimizaciones:

Recolección generacional – los objetos se dividen en dos conjuntos: “nuevos” y “antiguos”. En un código típico, muchos objetos tienen corta vida: aparecen, hacen su trabajo y mueren rápido, entonces tiene sentido rastrear los objetos nuevos y eliminarlos de la memoria si corresponde. Aquellos que sobreviven el tiempo suficiente, se vuelven “viejos” y son examinados con menos frecuencia.
Recolección incremental – Si hay muchos objetos, y tratamos de recorrer y marcar todo el conjunto de objetos a la vez, puede llevar algún tiempo e introducir retrasos notables en la ejecución. Entonces el motor divide la recolección de basura en partes. Luego limpia esas partes, una tras otra. Hay muchas tareas de recolección pequeñas en lugar de una grande. Eso requiere un registro adicional entre ellas para rastrear los cambios, pero tenemos muchos pequeños retrasos en lugar de uno grande.
Recolección de tiempo inactivo – el recolector de basura trata de ejecutarse solo mientras la CPU está inactiva, para reducir el posible efecto en la ejecución.
Hay otras optimizaciones y tipos de algoritmos de recolección de basura. Por mucho que quiera describirlos aquí, tengo que evitarlo porque diferentes motores implementan diferentes ajustes y técnicas. Y, lo que es aún más importante, las cosas cambian a medida que se desarrollan los motores, por lo que probablemente no vale la pena profundizar sin una necesidad real. Por supuesto, si tienes verdadero interés, a continuación hay algunos enlaces para ti.

Resumen
Los principales puntos a saber:

La recolección de basura se ejecuta automáticamente. No la podemos forzar o evitar.
Los objetos se retienen en la memoria mientras son accesibles.
Ser referenciado no es lo mismo que ser accesible (desde una raíz): un conjunto de objetos interconectados pueden volverse inalcanzables como un todo, como vimos en el ejemplo de arriba.
Los motores modernos implementan algoritmos avanzados de recolección de basura.

Un libro general “The Garbage Collection Handbook: The Art of Automatic Memory Management” (R. Jones et al) cubre algunos de ellos.

Si estás familiarizado con la programación de bajo nivel, la información más detallada sobre el recolector de basura V8 se encuentra en el artículo A tour of V8: Garbage Collection.

V8 blog también publica artículos sobre cambios en la administración de memoria de vez en cuando. Naturalmente, para aprender la recolección de basura, es mejor que se prepare aprendiendo sobre los componentes internos de V8 en general y lea el blog de Vyacheslav Egorov que trabajó como uno de los ingenieros de V8. Estoy diciendo: “V8”, porque se cubre mejor con artículos en Internet. Para otros motores, muchos enfoques son similares, pero la recolección de basura difiere en muchos aspectos.

Es bueno tener un conocimiento profundo de los motores cuando se necesitan optimizaciones de bajo nivel. Sería prudente planificar eso como el siguiente paso después de que esté familiarizado con el lenguaje.



*/