const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createSmithSchema, updateCrystalsSchema, updateEnergySchema } = require("../schemas/smiths.schema");
const controller = require("../controllers/smiths.controller");

router.get("/", auth, controller.getAllSmiths);
router.post("/", auth, validate(createSmithSchema), controller.createSmith);
router.patch("/:id/energy", auth, validate(updateEnergySchema), controller.updateEnergy);
router.patch("/:id/crystals", auth, validate(updateCrystalsSchema), controller.updateCrystals);
router.delete("/:id", auth, controller.removeSmith);

module.exports = router;