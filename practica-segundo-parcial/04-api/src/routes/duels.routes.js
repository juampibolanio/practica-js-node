const duelController = require ("../controllers/duels.controller");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const { createDuelSchema } = require("../schemas/duel.schema");
const express = require("express");
const router = express.Router();

router.get("/", auth, duelController.getAllDuels);

router.post("/", auth, validate(createDuelSchema), duelController.createDuel);

router.delete("/:id", auth, duelController.removeDuel);

module.exports = router;
