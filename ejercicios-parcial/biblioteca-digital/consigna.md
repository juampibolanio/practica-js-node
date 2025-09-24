Escenario — "Biblioteca Digital con API"

Tu tarea es gestionar una biblioteca digital usando la JSONPlaceholder API (https://jsonplaceholder.typicode.com/
), que simula recursos RESTful.

Contexto:

Los "libros" serán simulados con los posts de la API. Cada post tiene id, title y body que puedes considerar como título y descripción del libro. X

Los "usuarios" serán los usuarios de la API (id, name, email). X

Cada usuario puede “tomar prestado” un libro creando un nuevo recurso mediante POST en la API (simulación).

Objetivos / actividades que tu código debe cubrir:

Cargar los libros: Obtener la lista de posts desde https://jsonplaceholder.typicode.com/posts y guardarlos en tu estructura. X

Cargar usuarios: Obtener la lista de usuarios desde https://jsonplaceholder.typicode.com/users. X

Buscar libros: Por título o por autor (usuario asociado al post).X

Filtrar libros: Por palabras clave en el título o en la descripción.X

Registrar un préstamo: Simular que un usuario toma un libro mediante POST a https://jsonplaceholder.typicode.com/posts. Debe enviar userId y bookId  X

Actualizar estados automáticamente: Cada cierto tiempo, algunos libros cambian de estado (disponible, prestado) de manera aleatoria.X

Simular eventos paralelos: Varios usuarios tomando libros al mismo tiempo, usando Promise.all. X

Estadísticas:

Cuántos libros tiene cada usuario. X

Cantidad de libros “prestados”, “disponibles”. X

Comparaciones de ID: Mostrar diferencias entre == y === al buscar libros por id, porque la API devuelve números y vos podrías recibir strings.