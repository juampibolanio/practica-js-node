const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);

router.post("/", orderController.create);

router.patch("/:id/cancel", orderController.cancelOrder);
router.patch("/:id/pay", orderController.payOrder);

module.exports = router;