import Booking from "./../models/bookingModel.js";
import handlerFactory from "./handlerFactory.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const bookingController = {
	createBooking: handlerFactory.createOne(Booking),
	getAllBookings: handlerFactory.getAll(Booking),
	getBooking: handlerFactory.getOne(Booking),
	updateBooking: handlerFactory.updateOne(Booking),
	deleteBooking: handlerFactory.deleteOne(Booking),

	getBookingsForUser: catchAsync(async (req, res, next) => {
		const userId = req.params.userId;

		if (!userId) {
			return next(new AppError("User ID is required", 400));
		}

		const bookings = await Booking.find({ user: userId }).populate({
			path: "listing",
			populate: { path: "host" },
			// host is nested under listing, like this you can also populate those fields
			// populate listing -> populate host, nested under listing
		});

		if (bookings.length === 0) {
			return next(new AppError("No bookings found for this user", 404));
		}

		res.status(200).json({
			status: "success",
			results: bookings.length,
			data: {
				bookings,
			},
		});
	}),
};

export default bookingController;
