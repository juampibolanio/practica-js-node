const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const engineerController = require("../controllers/engineer.controller");
const { createEngineerSchema, updateXpSchema } = require("../schemas/engineer.schema");

router.get("/", auth, engineerController.getAllEngineers);

router.post("/", auth, validate(createEngineerSchema), engineerController.createEngineer);

router.patch("/:id/xp", auth, validate(updateXpSchema), engineerController.updateXp);

module.exports = router;