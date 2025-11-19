const express = require("express");
const router = express.Router();
const { createGuardianSchema, updateEnergySchema, updateItemsSchema } = require("../schemas/guardian.schema");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const guardianController = require("../controllers/guardians.controller");

router.get("/", auth, guardianController.getAllGuardians);

router.post("/", auth, validate(createGuardianSchema), guardianController.createGuardian);

router.patch("/:id/energy", auth, validate(updateEnergySchema), guardianController.updateEnergy);

router.patch("/:id/items", auth, validate(updateItemsSchema), guardianController.updateItems);

module.exports = router;