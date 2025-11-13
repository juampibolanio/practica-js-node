const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { createBookingSchema, updateBookingSchema, patchBookingSchema } = require("../schemas/booking.schema");
const bookingController = require("../controllers/booking.controller");

router.get("/", bookingController.getAll);
router.get("/:id", bookingController.getById);

router.post("/", validate(createBookingSchema), bookingController.create);
router.put("/:id", validate(updateBookingSchema), bookingController.update);
router.patch("/:id", validate(patchBookingSchema), bookingController.patch);

router.delete("/:id", bookingController.remove);

module.exports = router;