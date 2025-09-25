const Libro = require("./Libro");
const Usuario = require("./Usuario");

class GestorBiblioteca {
    libros = [];
    usuarios = [];

    async cargarLibros() {
        try {

            const response = await fetch("https://jsonplaceholder.typicode.com/posts")

            if (response.ok) {

                const data = await response.json();

                const librosResultados = data.map(l => new Libro(
                    l.id,
                    l.title,
                    l.body,
                    l.userId
                ));

                this.libros = librosResultados;
                console.log("Libros cargados correctamente");
            }
        } catch (error) {
            console.error(`Hubo un error al cargar los libros: ${error}`);
        }
    }

    async cargarUsuarios() {
        try {

            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (response.ok) {
                const data = await response.json();

                const usuariosCargados = data.map(u => new Usuario(
                    u.id,
                    u.name,
                    u.email
                ))

                this.usuarios = usuariosCargados;

                console.log("Usuarios cargados correctamente.");
            }
        } catch (error) {
            console.error(`Ha ocurrido un error al cargar los usuarios ${error}`);
        }
    }

    buscarLibrosPorAutor(autorId) {
        const librosEncontrados = this.libros.filter((l) => l.autorId === autorId)

        if (librosEncontrados.length === 0) {
            return [];
        }
        return librosEncontrados;
    }

    buscarLibrosPorTitulo(titulo) {
        const librosEncontrados = this.libros.filter(l => l.titulo.toLowerCase() === titulo.toLowerCase());

        if (librosEncontrados.length === 0) {
            return [];
        }

        return librosEncontrados;
    }

    filtrarLibros(parametroBusqueda) {

        let librosEncontrados = this.libros.filter((l) => l.titulo.toLowerCase().includes(parametroBusqueda.toLowerCase()));

        if (librosEncontrados.length === 0) {
            librosEncontrados = this.libros.filter((l) => l.descripcion.includes(parametroBusqueda.toLowerCase()));
        }

        if (librosEncontrados.length === 0) {
            return []
        }
        return librosEncontrados;
    }

    crearContadorPrestamos() {
        let contador = 0;
        return function () {
            contador++;
            console.log("Total de préstamos otorgados: ", contador);
            return contador;
        }
    }

    async registrarPrestamo(idLibro, idUsuario) {

        try {

            let libro = this.libros.find(l => l.id === idLibro);
            let usuario = this.usuarios.find(u => u.id === idUsuario);

            if (libro && usuario && libro.estado != "prestado") {

                let prestamo = {
                    bookId: libro.id,
                    userId: usuario.id
                }

                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(prestamo)
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP ${response.status}`);
                }

                const datos = await response.json();
                libro.estado = "prestado";

                console.log("Prestamo realizado", datos, "\nLibro: ", libro.titulo, "\nUsuario:", usuario.nombre);
                return datos;

            } else {

                if (libro.estado == "prestado") {
                    console.error("El libro indicado ya fue prestado");

                } else {
                    console.error("La id del libro o usuario es incorrecta o no existe");
                }
                return null;
            }
        } catch (error) {
            console.log("Hubo un error al registrar el préstamo del libro", error.message);
        }
    }

    actualizarEstados() {
        let estados = ["prestado", "disponible"];
        let librosAActualizar = [];

        for (let i = 0; i < 10; i++) {
            librosAActualizar.push(this.indexAlAzar(this.libros));
        }

        librosAActualizar.forEach((l) => {
            l.estado = this.indexAlAzar(estados)
        });

        return librosAActualizar;
    }

    contarLibrosPorUsuario() {
        let librosPorUsuario = {}

        for (const usuario of this.usuarios) {

            let librosDelUsuario = this.libros.filter((l) => l.autorId === usuario.id)

            librosPorUsuario[usuario.nombre] = librosDelUsuario.length;
        }
        return librosPorUsuario;
    }

    contarLibrosPorEstado() {
        let librosPorEstado = {
            "disponibles" : 0,
            "prestados" : 0,
        };

        for (const libro of this.libros) {
            
            if (libro.estado === "disponible") {
                librosPorEstado.disponibles++;
            } 
            else if (libro.estado === "prestado") {
                librosPorEstado.prestados++;
            }
        }

        return librosPorEstado;
    }

    indexAlAzar(array) {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }

}



async function ejecutar() {
    
    let gestor = new GestorBiblioteca();
    const contarPrestamos = gestor.crearContadorPrestamos();
    await gestor.cargarLibros();
    await gestor.cargarUsuarios();

    let intervalID = setInterval(() => {
        let actualizados = gestor.actualizarEstados();
        console.log(actualizados);
        console.log("--------------------------------");
        console.log(gestor.contarLibrosPorEstado());
        procesarPrestamos();
    }, 5000);


    async function procesarPrestamos() {

        try {
            const prestamos = await Promise.all([
                gestor.registrarPrestamo(
                    gestor.indexAlAzar(gestor.libros).id,
                    gestor.indexAlAzar(gestor.usuarios).id
                ),
                gestor.registrarPrestamo(
                    gestor.indexAlAzar(gestor.libros).id,
                    gestor.indexAlAzar(gestor.usuarios).id
                ),
                gestor.registrarPrestamo(
                    gestor.indexAlAzar(gestor.libros).id,
                    gestor.indexAlAzar(gestor.usuarios).id
                )
            ]);
            console.log("_--------------");
            for (let i = 0; i < prestamos.length; i++) {
                console.log(contarPrestamos())
            };
            console.log("_--------------");

            console.log("Préstamos procesados", prestamos);
            return prestamos;
        } catch (error) {
            console.error("Error al procesar los prestamos.", error);
        }
    }
}

ejecutar();