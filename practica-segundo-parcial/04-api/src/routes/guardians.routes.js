const express = require("express");
const router = express.Router();
const guardianController = require("../controllers/guardians.controller");
const auth = require("../middlewares/auth")
const validate = require("../middlewares/validate");
const { createGuardianSchema, updateGuardianItemsSchema, patchGuardianSchema} = require("../schemas/guardian.schema");

router.get("/", guardianController.getAllGuardian);
router.post("/", auth, validate(createGuardianSchema), guardianController.createGuardian);

router.patch("/:id/items", auth, validate(updateGuardianItemsSchema) ,guardianController.updateGuardianItems)
router.patch("/:id/energy", auth, guardianController.updateGuardianEnergy);
router.patch("/:id", auth, validate(patchGuardianSchema), guardianController.patchGuardian);

router.delete("/:id", auth, guardianController.removeGuardian);

module.exports = router;