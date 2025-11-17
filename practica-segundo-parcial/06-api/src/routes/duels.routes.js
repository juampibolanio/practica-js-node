const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const duelController = require("../controllers/duels.controller");

router.get("/", auth, duelController.getAllDuels);

router.post("/:idAlchemistA/duel/:idAlchemistB", auth, duelController.createDuel);

module.exports = router;