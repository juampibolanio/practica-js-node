const express = require("express");
const router = express.Router();
const { createProductSchema, updateProductSchema, patchProductSchema } = require("../schemas/products.schema");
const productController = require("../controllers/product.controller");
const validate = require("../middlewares/validate");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post("/", validate(createProductSchema) ,productController.create);
router.put("/:id", validate(updateProductSchema) ,productController.update);
router.patch("/:id", validate(patchProductSchema) ,productController.patch);

router.delete("/:id", productController.delete);

module.exports = router;