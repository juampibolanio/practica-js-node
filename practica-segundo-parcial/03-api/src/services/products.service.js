const crypto = require("crypto");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const products = [];

function getAll() {
    return products;
}

function getById(id) {
    const product = products.find(p => p.id == id);

    if (!product) {
        throw new NotFoundError(`Error: no se encontró el producto con el id ${id}`);
    }
    return product;
}

function create(data) {
    const exists = products.find(p => p.name == data.name);

    if (exists) {
        throw new ConflictError(`Error: el producto con el nombre ${data.name} ya existe.`)
    }

    const newProduct = {
        id: crypto.randomUUID(),
        ...data,
    }

    products.push(newProduct);
    return newProduct;
}

function update(id, data) {
    const index = products.findIndex(p => p.id == id);

    if (index === -1) {
        throw new NotFoundError(`Error: el producto con el id ${id} no existe.`);
    }

    const exists = products.find(p => p.name == data.name);

    if (exists) {
        throw new ConflictError(`Error: el producto con el nombre ${data.name} ya existe.`);
    }

    const updatedProduct = {
        id,
        ...data
    }

    products[index] = updatedProduct;
    return updatedProduct;
}

function patch(id, data) {
    const index = products.findIndex(p => p.id == id);

    if (index === -1) {
        throw new NotFoundError(`Error: el producto con el id ${id} no existe.`);
    }

    if (data.name) {
        const exists = products.find(p => p.name == data.name);

        if (exists) {
            throw new ConflictError(`Error: el producto con el nombre ${data.name} ya existe.`);
        }
    }
    
    const product = products.find(p => p.id == id);

    const updatedProduct = {
        ...product,
        ...data
    }

    products[index] = updatedProduct;
    return updatedProduct;
}

function remove(id) {
    const index = products.findIndex(p => p.id == id);

    if (index === -1) {
        throw new NotFoundError(`Error: el producto con el id ${id} no existe.`);
    }

    const productRemoved = products[index];

    products.splice(index, 1);
    return productRemoved;
}

module.exports = { getAll, getById, create, update, patch, remove, products };