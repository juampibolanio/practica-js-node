class Pedido {
    constructor(id, cliente, producto, estado = "pendiente") {
        this.id = id;
        this.cliente = cliente;
        this.producto = producto;
        this.estado = estado;
    }

    actualizarEstado(estado) {

        const estadosValidos = ["pendiente", "asignado", "enRuta", "entregado", "cancelado"];

        if (!estadosValidos.includes(estado)) {
            throw new EstadoInvalidoError();
        }

        this.estado = estado;
    }
}

Pedido.prototype.cancelar = function () {
    this.actualizarEstado("cancelado");
}

class EstadoInvalidoError extends Error {
    constructor() {
        super("El estado indicado no es válido.");
    }
}

export default Pedido;