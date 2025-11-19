const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const robotController = require("../controllers/robot.controller");
const {createRobotSchema, updateComponentsSchema} = require("../schemas/robot.schema");

router.get("/", auth, robotController.getAllRobots);

router.post("/", auth, validate(createRobotSchema), robotController.createRobot);

router.patch("/:id/components", auth, validate(updateComponentsSchema), robotController.updateComponents);

module.exports = router;