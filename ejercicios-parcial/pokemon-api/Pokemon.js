const EstadoInvalidoError = require("./Error");

class Pokemon {
    id;
    nombre;
    tipos;
    peso;
    altura;
    estado;
    entrenador;

    constructor(id, nombre, tipos, peso, altura, estado = "activo", entrenador = null) {
        this.id = id;
        this.nombre = nombre;
        this.tipos = tipos;
        this.peso = peso;
        this.altura = altura;
        this.estado = estado;
        this.entrenador = entrenador;
    }

    actualizarEstado(estado) {
        const estados = ["activo", "derrotado"];

        if (!estados.includes(estado.toLowerCase())) {
            throw new EstadoInvalidoError("Error: El estado no es válido");
        }
        this.estado = estado;
    }
}

Pokemon.prototype.derrotar = function () {
    this.estado = "derrotado";
}

module.exports = Pokemon;