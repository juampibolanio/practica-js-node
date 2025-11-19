const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const challengesController = require("../controllers/challenges.controller");
const createChallengeSchema = require("../schemas/challenge.schema");

router.get("/", auth, challengesController.getAllChallenges);

router.post("/", auth, validate(createChallengeSchema), challengesController.createChallenge)

router.post("/:idChallenge/attempt/:idGuardian", auth, challengesController.attemptChallenge);

router.delete("/:id", auth, challengesController.removeChallenge);

module.exports = router;