const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { createProductSchema, updateProductSchema, patchProductSchema } = require("../schemas/product.validation");
const productController = require("../controllers/product.controller");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post("/", validate(createProductSchema), productController.create);
router.put("/:id", validate(updateProductSchema), productController.update);
router.patch("/:id", validate(patchProductSchema), productController.patch);
router.delete("/:id", productController.remove);

module.exports = router;