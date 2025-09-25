Escenario: Administración de Tareas con la API de JSONPlaceholder

Contexto:
Eres responsable de administrar tareas de usuarios para una aplicación de productividad. Cada tarea tiene: id, userId, title y completed (booleano). Los usuarios tienen id y name. X

Objetivos del ejercicio:

Cargar datos

Traer todos los usuarios de https://jsonplaceholder.typicode.com/users X

Traer todas las tareas de https://jsonplaceholder.typicode.com/todos X

Filtrado y búsqueda

Buscar tareas por título (exacto o parcial) X

Filtrar tareas completadas o pendientes X

Contar tareas por usuario X

POST (muy importante)

Registrar una nueva tarea para un usuario en https://jsonplaceholder.typicode.com/todos usando POST. X

La nueva tarea debe tener un título, un usuario asignado y completed = false. X

Simulación y actualizaciones

Cada cierto tiempo (ej: 5 segundos), marcar aleatoriamente algunas tareas como completadas o pendientes. X

Mostrar un warning si un usuario tiene más de 5 tareas pendientes. X

Promesas en paralelo

Simular que se registran 3 nuevas tareas en paralelo para distintos usuarios usando Promise.all. X

Closure (opcional pero recomendado)

Contador que cada vez que se llama, imprime cuántas tareas están pendientes en total. X