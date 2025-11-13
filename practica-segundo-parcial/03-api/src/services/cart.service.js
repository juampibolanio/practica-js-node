const NotFoundError = require("../errors/NotFoundError");
const InsuficientStockError = require("../errors/InsuficientStockError");
const productService = require("./products.service");

const cart = [];
const products = productService.getAll();

function showCart() {
    return cart;
}

function addProductToCart(data) {
    const product = products.find(p => p.id == data.id);

    if (!product) {
        throw new NotFoundError(`Error. El producto con id ${data.id} no existe.`);
    }
    
    // acá verifico si el producto ya está en el carro.
    const productIndex = cart.findIndex(p => p.id == data.id)

    let qty = 0;

    // si está en el carro, le sumo la cantidad indicada a la ya existente.
    if (productIndex != -1) {

        qty = cart[productIndex].qty;
        qty += data.qty;
    } else {
        qty = data.qty;
    }

    // verifico si la cantidad del producto es mayor al stock
    if (qty > product.stock) {
        throw new InsuficientStockError(`El stock del producto ${product.name} es insuficiente.`);
    }

    // calculo el subtotal.
    let subtotal = qty * product.price;

    const addedProduct = {
        id: product.id,
        name: product.name,
        qty: qty,
        price: product.price,
        subtotal: subtotal,
    };

    if (productIndex != -1) {
        cart[productIndex] = addedProduct;
    }

    cart.push(addedProduct);
    return addedProduct;
}

function emptyCart() {
    cart = [];
    return cart;
}

module.exports = { showCart, addProductToCart, emptyCart };