class Usuario {
    id;
    nombre;
    correo;

    constructor(id, nombre, correo) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }
}

module.exports = Usuario;