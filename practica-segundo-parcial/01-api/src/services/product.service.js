const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const crypto = require("crypto");

let products = [];

function getAll() {
    return products;
}

function getById(id) {
    const product = products.find((p) => p.id == id);

    if (!product) {
        throw new NotFoundError("El producto no fue encontrado");
    }

    return product;
}

function create(data) {
    const exists = products.find((p) => p.name == data.name);

    if (exists) {
        throw new ConflictError("El producto que se desea crear ya existe");
    }

    const newProduct = {
        id: crypto.randomUUID(),
        ...data,
    };

    products.push(newProduct);
    return newProduct;
}

function update(id, data) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        throw new NotFoundError("El producto no fue encontrado");
    }

    const exists = products.find((p) => p.name === data.name && p.id !== id);

    if (exists) {
        throw new ConflictError("El nombre del producto ya existe.");
    }

    const updated = {
        id,
        ...data
    };

    products[index] = updated;

    return updated;
}

function patch(id, data){
    
    const product = products.find(p => p.id === id);

    if (!product) {
        throw new NotFoundError("El producto no fue encontrado");
    }

    if (data.name) {
        const exists = products.find(
            p => p.name === data.name && p.id !== id
        );

        if (exists) {
            throw new ConflictError("El nombre del producto ya existe");
        }
    }
    
    const updated = {
        ...product,
        ...data
    };

    const index = products.findIndex(p => p.id === id);
    products[index] = updated

    return updated;
}

function remove(id) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        throw new NotFoundError("El producto no fue encontrado");
    }

    const deleted = products[index];
    products.splice(index, 1);

    return deleted;
}

module.exports = { getAll, getById, create, update, patch, remove };