import express from "express";
import bookingController from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.get("/", bookingController.getAllBookings);
bookingRouter.post("/", bookingController.createBooking);

bookingRouter.get("/:id", bookingController.getBooking);
bookingRouter.patch("/:id", bookingController.updateBooking);
bookingRouter.delete("/:id", bookingController.cancelBooking);

bookingRouter.get("/user/:userId", bookingController.getBookingsForUser);

export default bookingRouter;
