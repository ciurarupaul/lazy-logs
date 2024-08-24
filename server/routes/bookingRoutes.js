import express from "express";
import bookingController from "../controllers/bookingController.js";

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

export default router;
