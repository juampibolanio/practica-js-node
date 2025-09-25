const Usuario = require("./Usuario");
const Tarea = require("./Tarea");

class AdministradorTareas {
    usuarios = [];
    tareas = [];

    async cargarUsuarios() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (response.ok) {

                const data = await response.json();

                const usuarios = data.map(u => new Usuario(
                    u.id,
                    u.name
                ));

                console.log("Usuarios cargados correctamente");
                return usuarios;
            }
        } catch (error) {
            console.error("Hubo un error al cargar los usuarios", error);
        }
    }

    async cargarTareas() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");

            if (response.ok) {

                const data = await response.json();

                const tareas = data.map(t => new Tarea(
                    t.id,
                    t.userId,
                    t.title,
                    t.completed
                ))

                console.log("Tareas cargadas correctamente");
                return tareas;
            }
        } catch (error) {
            console.error("Hubo un error al cargar los usuarios", error);
        }
    }

    buscarTareas(titulo) {
        let encontrado = this.tareas.filter(t => t.titulo.toLowerCase().includes(titulo.toLowerCase()));

        if (encontrado.length > 0) {
            return encontrado;
        }
        return null;
    }

    filtrarTareasCompletas() {

        const tareasCompletas = this.tareas.filter(t => t.completada === true);

        if (tareasCompletas === 0) {
            console.log("Ninguna tarea fue completa");
            return null
        }
        return {
            "totalTareasCompletas": tareasCompletas.length,
            "tareas": tareasCompletas
        }
    }

    filtrarTareasPendientes() {
        const tareasPendientes = this.tareas.filter(t => t.completada === false);

        if (tareasPendientes === 0) {
            console.log("Todas las tareas fueron completas");
            return null;
        }
        return {
            "totalTareasPendientes": tareasPendientes.length,
            "tareas": tareasPendientes
        }
    }

    mostrarTareasPorUsuario() {

        const tareasPorUsuario = {};

        for (const usuario of this.usuarios) {

            const tareasUsuario = this.tareas.filter(t => usuario.id === t.usuarioId);

            if (tareasUsuario.length > 0) {
                tareasPorUsuario[usuario.nombre] = tareasUsuario;
            } else {
                console.log(`El usuario ${usuario.nombre} no tiene tareas`);
            }
        }
        return tareasPorUsuario;
    }

    contarTareasPorUsuario() {
        return this.usuarios.map(usuario => {
            let cantidadTareas = this.tareas.filter(t => t.usuarioId === usuario.id).length;
            return {
                usuario: usuario.nombre,
                cantidad: cantidadTareas
            }
        })
    }

    async registrarTarea(tarea) {
        try {

            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarea)
            });

            if (response.ok) {

                const data = await response.json();

                console.log("Tarea registrada con éxito");
                console.log(data);
                return data;
            }
        } catch (error) {
            console.error("Error al registrar la tarea.", error);
        }
    }

    async marcarTareasAleatoriamente() {

        const invervalId = setInterval(() => {
            let estados = [true, false];

            if (this.tareas.length === 0) {
                console.log("No hay tareas por marcar.");
            }

            let randomIndex = Math.floor(Math.random() * this.tareas.length);
            let tareaAMarcar = this.tareas[randomIndex];

            tareaAMarcar.completada = estados[Math.floor(Math.random() * estados.length)];

            console.log("Tarea actualizada");
            console.log(tareaAMarcar);

        }, 5000);
    }

    contadorTareasPendientes() {
        return () => {
            let pendientes = this.tareas.filter(t => t.completada === false);
            console.log(`Total tareas pendientes ${pendientes.length}`);
            return pendientes.length;
        }
    }

}


async function ejecutar() {
    const admin = new AdministradorTareas();

    admin.usuarios = await admin.cargarUsuarios();
    admin.tareas = await admin.cargarTareas();
    console.log("-----------------------------------");

    let tareasPorUsuario = admin.contarTareasPorUsuario();

    tareasPorUsuario.forEach(u => {
        if (u.cantidad > 5) {
            console.warn(`El usuario ${u.usuario} tiene demasiadas tareas pendientes (${u.cantidad})`);
        }
    });

    const tarea1 = new Tarea(1, 5, "Estudiar JavaScript", false);
    const tarea2 = new Tarea(2, 6, "Practicar con la PokeAPI", true);
    const tarea3 = new Tarea(3, 2, "Hacer ejercicios de programación", false);

    const procesarTareas = await Promise.all([
        admin.registrarTarea(tarea1),
        admin.registrarTarea(tarea2),
        admin.registrarTarea(tarea3),
    ]);

    console.log(await procesarTareas);


}

ejecutar();