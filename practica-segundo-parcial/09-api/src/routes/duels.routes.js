const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const duelsController = require("../controllers/duels.controller");

router.get("/", auth, duelsController.getAllDuels);

router.post("/:idWarriorA/duel/:idWarriorB", auth, duelsController.createDuels);

module.exports = router;