class GestorPedidos {
    #pedidos = [];
    listaEspera = [];

    agregarPedido(pedido) {

        const duplicado = this.#pedidos.some(p => p.id === pedido.id);

        if (duplicado) {
            throw new Error("Pedido duplicado");
        }

        this.#pedidos.push(pedido);
    }

    agruparPorEstado() {
        return this.#pedidos.reduce((acum, pedido) => {

            if (!acum[pedido.estado]) {
                acum[pedido.estado] = [];
            }

            acum[pedido.estado].push(pedido);
            return acum;
        }, {
            pendiente: [],
            asignado: [],
            enRuta: [],
            entregado: [],
            cancelado: [],
        })
    }

    asignarPedidos(repartidores) {
        const listaEspera = [];
        let asignaciones = {};

        repartidores.forEach((rep) => (asignaciones[rep] = []));

        let index = 0;
        for (let pedido of this.#pedidos) {
            
            const repartidor = repartidores[index];
            if (pedido.estado === "pendiente") {
                if (asignaciones[repartidor].length >= 3) {
                    this.listaEspera.push(pedido);
                } else {
                    asignaciones[repartidor].push(pedido);
                    pedido.actualizarEstado("enRuta");
                }
            }

            index = (index + 1) % repartidores.length;
        }
        return {asignaciones, listaEspera}
    }

    contadorPedidosPorCliente(cliente) {
        let contador = 0;

        return () => {
            contador++;
            console.log(`El cliente ${cliente} hizo ${contador} pedidos`);
            return contador;
        }
    }

    validarEntradaObjeto(obj) {

        if (obj.id === undefined || !obj.cliente || !obj.producto) {
            throw new Error("Datos incompletos");
        }
        return new Pedido(
        Number(obj.id),
        String(obj.cliente),
        String(obj.producto ),
        obj.estado ? String(obj.estado) : "pendiente"
        ); 
    }

    priorizarPedidos(clientesVips, productosLentos) {
        let alta = [];
        let media = [];
        let baja = [];

        for (const pedido of this.#pedidos) {
            
            if (clientesVips.includes(pedido.cliente)) {
                alta.push(pedido);
            } 
            else if (productosLentos.includes(pedido.producto)) {
                media.push(pedido);
            } 
            else {
                baja.push(pedido);
            }
        }

        if (alta.length >= 2) {
            console.log("Hay demasiados pedidos de alta prioridad, se va a suspender los pedidos de baja prioridad");
            return [...alta, ...media];
        }

        return [...alta, ...media, ...baja];
        
    }

    totalPedidos() {
        return this.#pedidos.length;
    }
}

export default GestorPedidos;