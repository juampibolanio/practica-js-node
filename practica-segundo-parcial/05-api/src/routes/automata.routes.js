const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const automataController = require("../controllers/automata.controller");
const { createAutomataSchema, updateAutomataComponents, updateAutomataEnergy  } = require("../schemas/automata.schema");

router.get("/", auth, automataController.getAllAutomatas);

router.post("/", auth, validate(createAutomataSchema), automataController.createAutomata);

router.patch("/:id/energy", auth, validate(updateAutomataEnergy), automataController.updateEnergy);

router.patch("/:id/components", auth, validate(updateAutomataComponents), automataController.updateComponents);

module.exports = router;
