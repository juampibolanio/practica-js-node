class Personaje {
    id;
    nombre;
    especie;
    estado;
    ubicacionActual;

    constructor(id, nombre, especie, estado, ubicacionActual) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.estado = estado;
        this.ubicacionActual = ubicacionActual;
    }
}

Personaje.prototype.desaparecer = function () {
    this.estado = "desaparecido";
}

module.exports = Personaje;