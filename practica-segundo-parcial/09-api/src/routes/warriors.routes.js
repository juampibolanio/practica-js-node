const express = require("express");
const router = express.Router();
const validate = require ("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createWarriorSchema, updateArtifactsSchema, updateEnergySchema } = require("../schemas/warriors.schema");
const warriorsController = require("../controllers/warriors.controller");

router.get("/", auth, warriorsController.getAllWarriors);

router.post("/", auth, validate(createWarriorSchema), warriorsController.createWarrior);

router.patch("/:id/energy", auth, validate(updateEnergySchema), warriorsController.updateEnergy);

router.patch("/:id/artifacts", auth, validate(updateArtifactsSchema), warriorsController.updateArtifacts);

router.delete("/:id", auth, warriorsController.removeWarrior);

module.exports = router;