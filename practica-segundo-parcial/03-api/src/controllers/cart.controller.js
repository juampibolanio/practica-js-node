const service = require("../services/cart.service");
const HttpStatus = require("../utils/HttpStatusCodes");

exports.showCart = (req, res, next) => {
    try {
        const cart = service.showCart();
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

exports.addProductToCard = (req, res, next) => {
    try {
        const addedProduct = service.addProductToCart(req.body);
        res.status(HttpStatus.CREATED).json(addedProduct);
    } catch (error){
        next(error);
    }
    
}

exports.emptyCart = (req, res, next) => {
    try {
        service.emptyCart();
        res.status(HttpStatus.NO_CONTENT).json({ message: "El carro se ha vaciado correctamente."});
    } catch (error) {
        next(error);
    }
}
