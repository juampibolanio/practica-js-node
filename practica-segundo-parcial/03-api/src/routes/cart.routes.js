const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const cartController = require("../controllers/cart.controller");
const { addToCardSchema } = require("../schemas/cart.schema");

router.get("/", cartController.showCart);
router.post("/add", validate(addToCardSchema), cartController.addProductToCard);
router.delete("/empty", cartController.emptyCart);

module.exports = router;
