const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const createDuelSchema = require("../schemas/duel.schema");
const duelController = require("../controllers/duels.controller");

router.get("/", auth, duelController.getAllDuels);

router.post("/", auth, validate(createDuelSchema), duelController.createDuel);

module.exports = router;