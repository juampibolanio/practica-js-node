Escenario: Gestor de Pokémon (PokeAPI)

API: https://pokeapi.co/api/v2/pokemon

Contexto

Estás desarrollando un sistema de gestión para un torneo Pokémon. El sistema debe traer datos de la API y simular distintos comportamientos.

Consignas

Clases principales

Pokemon: propiedades → id, nombre, tipos (puede tener varios), peso, altura, estado (ej: "activo", "derrotado"). X

Método en el prototipo derrotar() que cambia el estado a "derrotado". X 

Entrenador: propiedades → id, nombre, email. X

Error personalizado EstadoInvalidoError: se lanza si intentan poner un estado inválido a un Pokémon. X

GestorPokemon

Propiedades privadas: #pokemones, #entrenadores. X

Métodos:

cargarPokemones(n): usa fetch para traer los primeros n Pokémon de la API y guardarlos como objetos Pokemon. X

cargarEntrenadores(): inventa algunos entrenadores (pueden ser mockeados o traídos de otra API como JSONPlaceholder). X

buscarPorNombre(nombre): devuelve el Pokémon cuyo nombre coincida. X

filtrarPorTipo(tipo): devuelve los Pokémon que tengan ese tipo (ej: "grass", "fire"). X

asignarEntrenador(idPokemon, idEntrenador): asigna un entrenador a un Pokémon. 
Si el Pokémon ya está asignado, lanzar un error. X

contarPorTipo(): devuelve un objeto con la cantidad de Pokémon por tipo. X

actualizarEstadosAleatorios(): cada 5 segundos cambia aleatoriamente el estado de algunos Pokémon entre "activo" y "derrotado". X

procesarBatallas(): simula 3 batallas en paralelo (con Promise.all) donde al terminar un Pokémon pasa a estado "derrotado". X

Closure

contadorPokemonesActivos(): debe devolver una función que, al llamarla, imprime y retorna la cantidad de Pokémon en estado "activo". X

Simulación

Cada 5 segundos:

Actualizar estados aleatoriamente. X

Mostrar un warning si hay más de 5 Pokémon activos sin entrenador asignado:
"⚠️ Hay muchos Pokémon sin entrenador". X

Comparación entre == y === al buscar Pokémon por id (la API devuelve number, vos probá con string).

POST simulado

Método registrarBatalla() que haga un POST a JSONPlaceholder (/posts) simulando que se registra la batalla de un Pokémon contra otro.

Enviar en el body: resultado. X