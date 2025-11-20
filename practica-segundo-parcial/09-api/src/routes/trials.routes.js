const express = require("express");
const router = express.Router();
const validate = require ("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createTrialSchema } = require("../schemas/trial.schema");
const trialController = require("../controllers/trials.controller");

router.get("/", auth, trialController.getAllTrials);

router.post("/", auth, validate(createTrialSchema), trialController.createTrial);

router.post("/:idWarrior/attempt/:idTrial", auth, trialController.attemptTrial);

module.exports = router;