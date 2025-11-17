const express = require("express");
const router = express.Router();
const alchemistController = require ("../controllers/alchemist.controller");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createAlchemistSchema, updateCatalystsSchema, updateEnergySchema } = require("../schemas/alchemist.schema");

router.get("/", auth, alchemistController.getAll);

router.post("/", auth, validate(createAlchemistSchema), alchemistController.createAlchemist);

router.patch("/:id/catalysts", auth, validate(updateCatalystsSchema), alchemistController.updateCatalysts);

router.patch("/:id/energy", auth, validate(updateEnergySchema), alchemistController.updateEnergy);

module.exports = router;