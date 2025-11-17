const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createTrialSchema } = require("../schemas/trial.schema");
const trialController = require("../controllers/trial.controller");

router.get("/", auth, trialController.getAll);
router.get("/attempts", auth, trialController.getAllAttempts);

router.post("/", auth, validate(createTrialSchema), trialController.createTrial);

router.post("/:trialId/attempt/:alchemistId", trialController.attemptTrial);

module.exports = router;