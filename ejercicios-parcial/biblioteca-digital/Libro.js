class Libro {
    id;
    titulo;
    descripcion;
    autorId;
    estado;

    constructor(id, titulo, descripcion, autorId, estado = "disponible") {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autorId = autorId;
        this.estado = estado;
    }
}

module.exports = Libro;