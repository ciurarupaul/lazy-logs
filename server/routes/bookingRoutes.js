import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

// protection middleware

router
	.route("/")
	.get(bookingController.getAllBookings)
	.post(bookingController.createBooking);

router
	.route("/:id")
	.get(bookingController.getBooking)
	.patch(bookingController.updateBooking)
	.delete(bookingController.cancelBooking);

router.route("/user/:userId").get(bookingController.getBookingsForUser);

export default router;
