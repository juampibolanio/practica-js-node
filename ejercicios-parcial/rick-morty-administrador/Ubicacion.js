class Ubicacion {
    id;
    nombre;
    tipo;
    dimension;

    constructor(id, nombre, tipo, dimension) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.dimension = dimension;
    }

    actualizarDimension(nuevaDimension) {
        this.dimension = nuevaDimension;
    }
}

module.exports = Ubicacion;