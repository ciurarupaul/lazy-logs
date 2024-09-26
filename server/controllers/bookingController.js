import Listing from "../models/listingModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Booking from "./../models/bookingModel.js";
import handlerFactory from "./handlerFactory.js";

const bookingController = {
	createBooking: catchAsync(async (req, res, next) => {
		const bookingData = req.body;
		const newBooking = await Booking.create(bookingData);

		await Listing.findByIdAndUpdate(
			bookingData.listing,
			{
				$push: {
					blockedDates: {
						startDate: bookingData.startDate,
						endDate: bookingData.endDate,
					},
				},
			},
			{ new: true, runValidators: true }
		);

		res.status(201).json({
			status: "success",
			data: {
				booking: newBooking,
			},
		});
	}),

	// this was poorly planned - the listing should've fetched the bookings the same as the reviews, but i already created 3000+ lines of mock data (with blockedDates objs, now i should create booking for every listing so every listing would have blocked dates), so now i will also use this mongoose feature i guess

	// side effect - now when deleting/canceling a booking, i should also modify this blockedDates obj yey

	cancelBooking: catchAsync(async (req, res, next) => {
		const bookingId = req.params.id;
		const booking = await Booking.findById(bookingId);

		if (!booking) {
			return next(new AppError("No booking found with that ID", 404));
		}

		await Booking.findByIdAndDelete(bookingId);

		await Listing.findByIdAndUpdate(
			booking.listing,
			{
				$pull: {
					blockedDates: {
						startDate: booking.startDate,
						endDate: booking.endDate,
					},
				},
			},
			{ new: true, runValidators: true }
		);

		res.status(204).json({
			status: "success",
			data: null,
		});
	}),

	// as mentioned above, delete the booking's dates from the listing's blockedDates

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

		res.status(200).json({
			status: "success",
			results: bookings.length,
			data: {
				bookings: bookings.length > 0 ? bookings : null,
			},
		});
	}),

	// default, for testing
	getAllBookings: handlerFactory.getAll(Booking),
	getBooking: handlerFactory.getOne(Booking),
	updateBooking: handlerFactory.updateOne(Booking),
};

export default bookingController;
