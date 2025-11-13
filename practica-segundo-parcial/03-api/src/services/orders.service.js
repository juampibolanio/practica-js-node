const cartService = require("./cart.service");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const InsuficientStockError = require("../errors/InsuficientStockError");
const productService = require("./products.service");
const crypto = require("crypto");
const orderStates = require("../utils/orderStates");

let products = productService.getAll();
let orders = [];
let cart = cartService.showCart();

function getAll() {
    return orders;
}

function getById(id) {
    const order = orders.find(o => o.id == id);

    if (!order) {
        throw new NotFoundError(`La orden con el id ${id} no existe.`);
    }
    return order;
}

function create() {
    
    if (cart.length < 1) {
        throw new ConflictError("No se pudo crear el pedido. El carrito está vacío.");
    }

    // verifico que todos los productos del carrito estén en stock
    cart.forEach((p) => {
        let product = products.find(pr => pr.id == p.id);

        if (product.stock < p.qty) {
            throw new InsuficientStockError(`Error. No hay stock suficiente de ${product.name}`);
        }
    });

    // si están todos en stock, entonces descuento del mismo la cantidad indicada en el carrito
    cart.forEach((p) => {
        let product = products.find(pr => pr.id == p.id);
        product.stock -= p.qty;
    })

    // calculo el total
    let total = 0;
    cart.forEach((p) => total += p.subtotal);

    const newOrder = {
        id: crypto.randomUUID(),
        items: cart,
        total: total,
        date: new Date().toLocaleString("es-ar"),
        status: orderStates.PENDING,
    }

    orders.push(newOrder);

    // vacío el carrito
    cart = [];
    return newOrder;
}

function cancelOrder(orderId) {

    let order = orders.find(o => o.id == orderId);

    if (!order) {
        throw new NotFoundError(`Error. No se encontró la orden con el ID ${orderId}`);
    }

    if (order.status == orderStates.PAID) {
        throw new ConflictError(`Error. No se pudo cancelar la orden, debido a que ya fue pagada.`);
    }

    order.status = orderStates.CANCELLED;
    return order;
}   

function payOrder(orderId) {

    let order = orders.find(o => o.id == orderId);

    if (!order) {
        throw new NotFoundError(`Error. No se encontró la orden con el ID ${orderId}`);
    }

    if (order.status == orderStates.CANCELLED) {
        throw new ConflictError(`Error. No se pudo pagar la orden, debido a que ya fue cancelada.`);
    }

    order.status = orderStates.PAID;
    return order;
}

module.exports = { getAll, getById, create, cancelOrder, payOrder };