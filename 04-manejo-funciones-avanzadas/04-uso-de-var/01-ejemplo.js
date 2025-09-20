/*
Hay dos diferencias principales entre var y let/const:

Las variables var no tienen alcance de bloque: su visibilidad alcanza a la función, o es global si es declarada fuera de las funciones.
Las declaraciones var son procesadas al inicio de la función (o del script para las globales) .
Hay otra diferencia menor relacionada al objeto global que cubriremos en el siguiente capítulo.

Estas diferencias casi siempre hacen a var peor que let. Las variables a nivel de bloque son mejores. Es por ello que let fue presentado en el estándar mucho tiempo atrás, y es ahora la forma principal (junto con const) de declarar una variable.
*/