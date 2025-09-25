class Tarea {
    id;
    usuarioId;
    titulo;
    completada;

    constructor(id, usuarioId, titulo, completada = false) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.completada = completada;
    }
}

module.exports = Tarea;