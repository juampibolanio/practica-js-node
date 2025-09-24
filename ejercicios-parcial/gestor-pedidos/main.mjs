import Pedido from '../GestorPedidos/Pedido.mjs';
import GestorPedidos from '../GestorPedidos/GestorPedidos.mjs';

const clientes = ["Pedro", "Juan", "Maria", "Lucas", "Mauro"];
const productos = ["Papa", "Cebolla", "Pan", "Tomate", "Gaseosa", "Helado"];

function indexAlAzar(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

const gestor = new GestorPedidos();

function generarPedido() {
    return new Pedido(Math.floor(Math.random() * 1000), indexAlAzar(clientes), indexAlAzar(productos));
}

const intervalId = setInterval(() => {

    const nuevoPedido = generarPedido();

    try {
        gestor.agregarPedido(nuevoPedido);
        nuevoPedido.actualizarEstado("enConsulta");
        gestor.asignarPedidos(["Carlos", "Sofía", "Ana"]);
        console.log(`Pedido agregado ${nuevoPedido.cliente}`);
    } catch (error) {
        console.log(`Hubo un error: ${error}`);
    }

    const pendientes = gestor.agruparPorEstado().pendiente.length;

    if (pendientes >= 10) {
        console.log("¡¡Hay demasiados pedidos sin asignar!!");
        clearInterval(intervalId);
    }
}, 3000);

function entregarPedido(pedido, ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            pedido.actualizarEstado("entregado");
            resolve(pedido);
        }, ms);
    })
}

async function procesarEntregas() {
    
    const pedidosEnRuta = gestor.agruparPorEstado().enRuta.slice(0, 3);

    if (pedidosEnRuta.length === 0) {
        console.log("No hay pedidos para entregar aún");
        return;
    }

    const pedidosAEntregar = pedidosEnRuta.filter(p => p !== undefined);

    const resultados = await Promise.all(
        pedidosAEntregar.map(p => entregarPedido(p, Math.floor(Math.random() * 4000) + 1000))
    );

    console.log("Pedidos entregados:", resultados.map(p => `${p.cliente} (${p.producto})`));
}

setInterval(() => {
    procesarEntregas();
}, 3000);

const pedido1 = { id: 5, cliente: "Pedro", producto: "Pan" };
const pedido2 = { id: "5", cliente: "Juan", producto: "Tomate" };

// Comparación con ==
console.log(pedido1.id == pedido2.id);
// true, porque "5" se convierte a número antes de comparar

// Comparación con ===
console.log(pedido1.id === pedido2.id);
// false, porque uno es number (5) y el otro es string ("5")
