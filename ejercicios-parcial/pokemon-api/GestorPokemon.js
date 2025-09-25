const Pokemon = require("./Pokemon");
const Entrenador = require("./Entrenador");

class GestorPokemon {
    #pokemones = [];
    #entrenadores = [];

    async cargarPokemones(n) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}&offset=0`);
            if (response.ok) {
                let data = await response.json();

                let pokemones = await Promise.all(data.results.map(p => this.cargarPokemon(p.url)));

                this.#pokemones = pokemones;
                return pokemones;
            }
        } catch (error) {
            console.error("Hubo un error al cargar los pokemones.", error);
        }
    }

    async cargarPokemon(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                let pokemon = new Pokemon(
                    data.id,
                    data.species.name,
                    data.types.map(t => t.type.name),
                    data.weight,
                    data.height
                )
                return pokemon;
            }
        } catch (error) {
            console.error("Error al cargar el pokemon.", error);
        }
    }

    async cargarEntrenadores() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (response.ok) {
                const data = await response.json();

                let entrenadores = data.map(e => new Entrenador(
                    e.id,
                    e.name,
                    e.email,
                ))

                this.#entrenadores = entrenadores;
                return entrenadores;
            }
        } catch (error) {
            console.error("Error al cargar los entrenadores.", error);
        }
    }

    buscarPorNombre(nombre) {
        const encontrado = this.#pokemones.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase());

        if (encontrado) {
            return encontrado;
        }
        return null;
    }

    filtrarPorTipo(tipo) {
        const pokemonesFiltrados = this.#pokemones.filter((p) => p.tipos.some(t => t.toLowerCase() === tipo.toLowerCase()));

        if (pokemonesFiltrados) {
            return pokemonesFiltrados;
        }
        return null;
    }

    asignarEntrenador(idPokemon, idEntrenador) {
        let entrenador = this.#entrenadores.find(e => e.id === idEntrenador);
        let pokemon = this.#pokemones.find(p => p.id === idPokemon);

        if (pokemon && entrenador) {

            if (pokemon.entrenador !== null) {
                throw new Error("El pokemon ya tiene un entrenador asignado", pokemon.entrenador);
            }
            pokemon.entrenador = entrenador;
        }
        else {
            throw new Error("No se encontró pokemon o entrenador con esa id");
        }
    }

    contarPorTipo() {
        let pokemonesPorTipo = {}

        for (let pokemon of this.#pokemones) {

            pokemon.tipos.forEach(tipo => {
                if (!(tipo in pokemonesPorTipo)) {
                    pokemonesPorTipo[tipo] = 0;
                }
                pokemonesPorTipo[tipo]++;
            })
        }
        return pokemonesPorTipo;
    }

    actualizarEstadosAleatorios() {
        const estados = ["activo", "derrotado"];

        let intervalId = setInterval(() => {

            let pokemonActual = this.indexAlAzar(this.#pokemones);

            pokemonActual.actualizarEstado(this.indexAlAzar(estados));
            console.log(`Se actualizó el estado de ${pokemonActual.nombre} -> ${pokemonActual.estado}`);
        }, 5000);
    }

    procesarBatallas() {

    }

    generarBatallaPokemon(idPokemonAtacante, idPokemonDefensor) {
        return new Promise((resolve, reject) => {
            let atacante = this.#pokemones.find(p => p.id === idPokemonAtacante);
            let defensor = this.#pokemones.find(p => p.id === idPokemonDefensor);
            let participantes = [atacante, defensor];

            if (!atacante || !defensor) {
                reject(new Error("Pokemon inválido"));
                return;
            }

            setTimeout(() => {
                let numRandom = Math.floor(Math.random() * 2);

                let derrotado = participantes[numRandom];
                derrotado.actualizarEstado("derrotado");

                resolve({
                    ganador: participantes[numRandom === 0 ? 1 : 0],
                    perdedor: derrotado
                });
            }, 1000);
        })
    }

    contadorPokemonesActivos() {
        return () => {
            let activos = this.#pokemones.filter(p => p.estado === "activo");
            console.log(`Pokemones activos: ${activos.length}`);
            return activos;
        }
    }

    async procesarBatallas() {
        const resultadosBatallas = await Promise.all([
            this.generarBatallaPokemon(2, 3),
            this.generarBatallaPokemon(4, 5),
            this.generarBatallaPokemon(1, 7),
        ])

        return resultadosBatallas;
    }

    async registrarBatalla(resultadoBatalla) {
        try {

            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(resultadoBatalla)
                }
            )

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log("Se cargaron los resultados a la API");
                
                return data;
            }

        } catch (error) {
            console.error("Hubo un error al registrar la batalla"), error;

        }
    }

    indexAlAzar(array) {
        let index = Math.floor(Math.random() * array.length);
        return array[index];
    }
}

async function ejecutar() {
    const gestor = new GestorPokemon();
    
    let pokemones = await gestor.cargarPokemones();
    let entrenadores = await gestor.cargarEntrenadores();
    gestor.actualizarEstadosAleatorios();

    let invervalId = setInterval(async () => {

        gestor.asignarEntrenador(gestor.indexAlAzar(pokemones).id, gestor.indexAlAzar(entrenadores).id)

        let pokemonesSinEntrenador = pokemones.filter(p => p.entrenador === null).length;

        if (pokemonesSinEntrenador > 5) {
            console.warn("ATENCIÓN- Hay muchos pokémon sin entrenador");
        }

        gestor.registrarBatalla(await gestor.generarBatallaPokemon(4, 5));
        gestor.registrarBatalla(await gestor.generarBatallaPokemon(2, 7));

    }, 5000);
}

ejecutar();

module.exports = GestorPokemon;