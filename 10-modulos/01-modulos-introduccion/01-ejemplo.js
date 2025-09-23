/*
Qué es un módulo?
Un módulo es simplemente un archivo. Un script es un módulo. Tan sencillo como eso.

Los módulos pueden cargarse entre sí y usar directivas especiales export e import para intercambiar funcionalidad, llamar a funciones de un módulo de otro:

La palabra clave export etiqueta las variables y funciones que necesitan ser accesibles desde fuera del módulo actual.
import permite importar funcionalidades desde otros módulos.

Para resumir, los conceptos centrales son:

Un módulo es un archivo. Para que funcione import/export, los navegadores necesitan <script type="module">. Los módulos tienen varias diferencias:
Diferido por defecto.
Async funciona en scripts en línea.
Para cargar scripts externos de otro origen (dominio/protocolo/puerto), se necesitan encabezados CORS.
Se ignoran los scripts externos duplicados.
Los módulos tienen su propio alcance local de alto nivel y funcionalidad de intercambio a través de ‘import/export’.
Los módulos siempre funcionan en modo estricto.
El código del módulo se ejecuta solo una vez. Las exportaciones se crean una vez y se comparten entre los importadores.
Cuando usamos módulos, cada módulo implementa la funcionalidad y la exporta. Luego usamos import para importarlo directamente donde sea necesario. El navegador carga y evalúa los scripts automáticamente.

En la producción, se suelen usar paquetes como Webpack para agrupar módulos, para mejor rendimiento y otras razones.
*/