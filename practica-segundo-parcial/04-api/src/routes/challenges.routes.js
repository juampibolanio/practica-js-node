const express = require("express");
const router = express.Router();
const challengeController = require("../controllers/challenge.controller");
const HttpStatus = require("../utils/HttpStatusCodes");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { createChallengeSchema, patchChallengeSchema, attemptChallengeSchema } = require("../schemas/challenge.schema");

router.get("/", auth, challengeController.getAllChallenges);

router.post("/", auth, validate(createChallengeSchema), challengeController.createChallenge);
router.post("/:challengeId/attempt/:guardianId", auth, validate(attemptChallengeSchema), challengeController.attemptChallenge);

router.patch("/:id", auth, validate(patchChallengeSchema), challengeController.patchChallenge);

router.delete("/:id", auth, challengeController.removeChallenge);

module.exports = router;