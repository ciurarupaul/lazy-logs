const express = require("express");
const bookingController = require("./../controllers/bookingController");

const router = express.Router();

// protection middleware

router
	.route("/")
	.get(bookingController.getAllBookings)
	.post(bookingController.setListingUserIds, bookingController.createBooking);

router
	.route("/:id")
	.get(bookingController.getBooking)
	.patch(bookingController.updateBooking)
	.delete(bookingController.deleteBooking);

module.exports = router;
