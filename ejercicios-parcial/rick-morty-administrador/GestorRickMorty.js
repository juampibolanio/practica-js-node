const Personaje = require("./Personaje");
const Ubicacion = require("./Ubicacion");
const EstadoInvalidoError = require("./Errors");

class GestorRickMorty {
    #personajes;
    #ubicaciones;

    constructor() {
        this.#personajes = [];
        this.#ubicaciones = [];
    }

    obtenerPersonajes() {
        return this.#personajes;
    }

    async cargarPersonajes() {

        try {

            let response = await fetch("https://rickandmortyapi.com/api/character/?page=1");

            if (response.ok) {
                let data = await response.json();

                let personajes = data.results.map(p => new Personaje(
                    p.id,
                    p.name,
                    p.species,
                    p.status,
                    p.location.name
                ));

                this.#personajes = personajes;
                console.log("Personajes cargados correctamente");
                console.log(this.#personajes);
            } else {
                console.error("Error HTTP: " + response.status);
            }

        } catch (error) {
            console.error("Hubo un error al cargar los personajes." + error);
        }

    }

    async cargarUbicaciones() {
        try {

            let response = await fetch("https://rickandmortyapi.com/api/location/?page=1");

            if (response.ok) {

                let data = await response.json();

                let ubicaciones = data.results.map(u => new Ubicacion(
                    u.id,
                    u.name,
                    u.type,
                    u.dimension
                ));

                this.#ubicaciones = ubicaciones;
                console.log("Ubicaciones cargadas correctamente");
                console.log(this.#ubicaciones);

            } else {
                console.error("Error HTTP: " + response.status);
            }

        } catch (error) {
            console.error("Hubo un error al cargar las ubicaciones. " + error);
        }
    }

    buscarPorNombre(nombre) {
        return this.#personajes.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    }

    filtrarPorEstado(estado) {
        let existeEstado = this.#personajes.some(p => p.estado.toLowerCase() === estado.toLowerCase());

        if (existeEstado) {
            return this.#personajes.filter(p => p.estado.toLowerCase() === estado.toLowerCase());
        } else {
            throw new EstadoInvalidoError(`El estado ingresado (${estado}) no es válido`);
        }
    }

    contarEspecies() {
        return this.#personajes.reduce((acum, personaje) => {

            if (!acum[personaje.especie]) {
                acum[personaje.especie] = 0;
            }

            acum[personaje.especie]++;

            return acum;
        }, {})
    }

    asignarUbicaciones() {
        this.#personajes.map((p) => {

            let ubicacion = this.#ubicaciones.find((u) => u.nombre.toLowerCase() === p.ubicacionActual.toLowerCase());

            p.ubicacionActual = ubicacion;
            return p;
        })
    }

    actualizarEstadosAleatorios() {

        let estados = ["Alive", "Dead", "Unknown"];
        let personajesAActualizar = [];

        setTimeout(() => {

            for (let i = 0; i < 5; i++) {
                let personaje = this.#personajes[Math.floor(Math.random() * this.#personajes.length)];
                personajesAActualizar.push(personaje);
            }

            personajesAActualizar.forEach((p) => {
            p.estado = this.indexAlAzar(estados);

            console.log(`Estados de personajes actualizados`);
            personajesAActualizar.forEach(p => console.log(`${p.nombre} -> ${p.estado}`));
        });
        }, 5000);
    }

    generarDesaparicion(personaje, ms) {

        return new Promise(resolve => {
            setTimeout(() => {
                personaje.estado = "Desaparecido";
                resolve(personaje);
            }, ms);
        })
    }

    async procesarDesapariciones() {

        const resultados = await Promise.all([
            this.generarDesaparicion(this.indexAlAzar(this.#personajes), 3000),
            this.generarDesaparicion(this.indexAlAzar(this.#personajes), 6000),
            this.generarDesaparicion(this.indexAlAzar(this.#personajes), 2000)
        ])

        console.log("Desapariciones realizadas: ", resultados.map(p => `${p.nombre} ${p.estado}`));
    }

    indexAlAzar(array) {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    contadorPersonajesVivos() {
        return () => {
            let vivos = this.#personajes.filter(p => p.estado.toLowerCase() === "Alive").length;
            console.log(`La cantidad de personajes vivos es de: ${vivos}`);
            return vivos;
        }
    }

}

async function ejecutar() {
    let gestor = new GestorRickMorty();

    await gestor.cargarPersonajes();
    await gestor.cargarUbicaciones();

    console.log("------------------------------");

    console.log(gestor.asignarUbicaciones());
    console.log(gestor.obtenerPersonajes());

    console.log("---------------------------");

    console.log(gestor.actualizarEstadosAleatorios());
    console.log(gestor.obtenerPersonajes());

    console.log("---------------------------");

    console.log(await gestor.procesarDesapariciones());
    console.log(gestor.obtenerPersonajes());
    

    const intervalID = setInterval(() => {
        gestor.actualizarEstadosAleatorios()

        let personajes = gestor.obtenerPersonajes();

        let contador = 0;
        for (const personaje of personajes) {

            if (!personaje.ubicacionActual && personaje.estado === "Alive") {
                contador++;
            }
        }

        if (contador > 10) {
            console.warn("Hay más de 10 personajes vivos sin ubicacion asignada");
            clearInterval(intervalID);
        }

    }, 5000);

}

ejecutar();